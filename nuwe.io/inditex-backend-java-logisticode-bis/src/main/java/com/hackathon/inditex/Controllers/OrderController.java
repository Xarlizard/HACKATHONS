package com.hackathon.inditex.Controllers;

import com.hackathon.inditex.DTO.OrderResponseDTO;
import com.hackathon.inditex.DTO.ProcessedOrdersResponse;
import com.hackathon.inditex.Entities.Order;
import com.hackathon.inditex.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PostMapping("/order-assignations")
    public ResponseEntity<ProcessedOrdersResponse> assignOrders() {
        return orderService.processOrders();
    }
}