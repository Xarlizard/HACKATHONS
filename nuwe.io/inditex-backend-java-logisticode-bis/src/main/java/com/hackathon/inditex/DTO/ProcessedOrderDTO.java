package com.hackathon.inditex.DTO;

import lombok.Data;

@Data
public class ProcessedOrderDTO {
    private Double distance;
    private Long orderId;
    private String assignedLogisticsCenter;
    private String status;
    private String message;
}