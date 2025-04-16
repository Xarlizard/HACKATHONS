package com.hackathon.inditex.Services;

import com.hackathon.inditex.DTO.OrderResponseDTO;
import com.hackathon.inditex.DTO.ProcessedOrderDTO;
import com.hackathon.inditex.DTO.ProcessedOrdersResponse;
import com.hackathon.inditex.Entities.Center;
import com.hackathon.inditex.Entities.Order;
import com.hackathon.inditex.Repositories.CenterRepository;
import com.hackathon.inditex.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CenterRepository centerRepository;

    public ResponseEntity<OrderResponseDTO> createOrder(Order order) {
        order.setStatus("PENDING");
        order = orderRepository.save(order);
        
        OrderResponseDTO response = new OrderResponseDTO();
        response.setOrderId(order.getId());
        response.setCustomerId(order.getCustomerId());
        response.setSize(order.getSize());
        response.setCoordinates(order.getCoordinates());
        response.setStatus("PENDING");
        response.setMessage("Order created successfully in PENDING status.");
        
        return ResponseEntity.ok(response);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    public ResponseEntity<ProcessedOrdersResponse> processOrders() {
        List<Order> pendingOrders = orderRepository.findByStatus("PENDING")
                .stream()
                .sorted(Comparator.comparing(Order::getId))
                .collect(Collectors.toList());

        List<ProcessedOrderDTO> processedOrders = new ArrayList<>();

        for (Order order : pendingOrders) {
            ProcessedOrderDTO processedOrder = assignCenterToOrder(order);
            processedOrders.add(processedOrder);
        }

        ProcessedOrdersResponse response = new ProcessedOrdersResponse();
        response.setProcessedOrders(processedOrders);

        return ResponseEntity.ok(response);
    }

    private ProcessedOrderDTO assignCenterToOrder(Order order) {
        List<Center> availableCenters = centerRepository.findAll().stream()
                .filter(c -> c.getStatus().equals("AVAILABLE"))
                .filter(c -> c.getCapacity().contains(order.getSize()))
                .filter(c -> c.getCurrentLoad() < c.getMaxCapacity())
                .collect(Collectors.toList());

        ProcessedOrderDTO processedOrder = new ProcessedOrderDTO();
        processedOrder.setOrderId(order.getId());

        if (availableCenters.isEmpty()) {
            processedOrder.setStatus("PENDING");
            processedOrder.setMessage("No available centers support the order type.");
            return processedOrder;
        }

        Center nearestCenter = findNearestCenter(order, availableCenters);
        if (nearestCenter == null) {
            processedOrder.setStatus("PENDING");
            processedOrder.setMessage("All centers are at maximum capacity.");
            return processedOrder;
        }

        double distance = calculateHaversineDistance(
                order.getCoordinates().getLatitude(),
                order.getCoordinates().getLongitude(),
                nearestCenter.getCoordinates().getLatitude(),
                nearestCenter.getCoordinates().getLongitude()
        );

        nearestCenter.setCurrentLoad(nearestCenter.getCurrentLoad() + 1);
        centerRepository.save(nearestCenter);

        order.setStatus("ASSIGNED");
        order.setAssignedCenter(nearestCenter.getName());
        orderRepository.save(order);

        processedOrder.setDistance(distance);
        processedOrder.setAssignedLogisticsCenter(nearestCenter.getName());
        processedOrder.setStatus("ASSIGNED");

        return processedOrder;
    }

    private Center findNearestCenter(Order order, List<Center> centers) {
        return centers.stream()
                .min(Comparator.comparingDouble(center -> 
                    calculateHaversineDistance(
                        order.getCoordinates().getLatitude(),
                        order.getCoordinates().getLongitude(),
                        center.getCoordinates().getLatitude(),
                        center.getCoordinates().getLongitude()
                    )
                ))
                .orElse(null);
    }

    private double calculateHaversineDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth's radius in kilometers

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
}