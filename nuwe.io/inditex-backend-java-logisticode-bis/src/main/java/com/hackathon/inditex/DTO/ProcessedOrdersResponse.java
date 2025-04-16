package com.hackathon.inditex.DTO;

import java.util.List;

import lombok.Data;

@Data
public class ProcessedOrdersResponse {
    private List<ProcessedOrderDTO> processedOrders;
}