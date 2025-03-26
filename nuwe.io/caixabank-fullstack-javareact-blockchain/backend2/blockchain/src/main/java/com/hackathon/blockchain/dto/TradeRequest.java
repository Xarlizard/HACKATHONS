package com.hackathon.blockchain.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class TradeRequest {
    private String symbol;
    private BigDecimal quantity;
}
