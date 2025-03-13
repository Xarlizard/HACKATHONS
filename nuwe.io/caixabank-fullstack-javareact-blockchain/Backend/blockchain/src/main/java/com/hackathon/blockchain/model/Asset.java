package com.hackathon.blockchain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {
    private String symbol;
    private BigDecimal price;
    private BigDecimal quantity;
}