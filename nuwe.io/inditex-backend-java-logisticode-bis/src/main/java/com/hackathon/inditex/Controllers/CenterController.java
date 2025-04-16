package com.hackathon.inditex.Controllers;

import com.hackathon.inditex.DTO.ApiResponse;
import com.hackathon.inditex.Entities.Center;
import com.hackathon.inditex.Services.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/centers")
public class CenterController {

    @Autowired
    private CenterService centerService;

    @PostMapping
    public ResponseEntity<ApiResponse> createCenter(@RequestBody Center center) {
        return centerService.createCenter(center);
    }

    @GetMapping
    public ResponseEntity<List<Center>> getAllCenters() {
        return ResponseEntity.ok(centerService.getAllCenters());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCenter(@PathVariable Long id, @RequestBody Center center) {
        return centerService.updateCenter(id, center);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCenter(@PathVariable Long id) {
        return centerService.deleteCenter(id);
    }
}