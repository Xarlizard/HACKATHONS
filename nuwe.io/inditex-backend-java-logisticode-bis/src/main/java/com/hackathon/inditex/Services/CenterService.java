package com.hackathon.inditex.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hackathon.inditex.DTO.ApiResponse;
import com.hackathon.inditex.Entities.Center;
import com.hackathon.inditex.Repositories.CenterRepository;

@Service
public class CenterService {

    @Autowired
    private CenterRepository centerRepository;

    public ResponseEntity<ApiResponse> createCenter(Center center) {
        if (center.getCurrentLoad() > center.getMaxCapacity()) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse("Current load cannot exceed max capacity."));
        }

        Optional<Center> existingCenter = centerRepository.findByCoordinates(center.getCoordinates());
        if (existingCenter.isPresent()) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse("There is already a logistics center in that position."));
        }

        centerRepository.save(center);
        return ResponseEntity.ok(new ApiResponse("Logistics center created successfully."));
    }

    public List<Center> getAllCenters() {
        return centerRepository.findAll();
    }

    public ResponseEntity<ApiResponse> updateCenter(Long id, Center centerDetails) {
        Optional<Center> center = centerRepository.findById(id);
        if (center.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Center existingCenter = center.get();
        if (centerDetails.getName() != null) existingCenter.setName(centerDetails.getName());
        if (centerDetails.getCapacity() != null) existingCenter.setCapacity(centerDetails.getCapacity());
        if (centerDetails.getStatus() != null) existingCenter.setStatus(centerDetails.getStatus());
        if (centerDetails.getCurrentLoad() != null) {
            if (centerDetails.getCurrentLoad() > existingCenter.getMaxCapacity()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse("Current load cannot exceed max capacity."));
            }
            existingCenter.setCurrentLoad(centerDetails.getCurrentLoad());
        }
        if (centerDetails.getMaxCapacity() != null) existingCenter.setMaxCapacity(centerDetails.getMaxCapacity());
        if (centerDetails.getCoordinates() != null) existingCenter.setCoordinates(centerDetails.getCoordinates());

        centerRepository.save(existingCenter);
        return ResponseEntity.ok(new ApiResponse("Logistics center updated successfully."));
    }

    public ResponseEntity<ApiResponse> deleteCenter(Long id) {
        centerRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse("Logistics center deleted successfully."));
    }
}