package com.hackathon.blockchain.controller;

import com.hackathon.blockchain.service.MarketDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/market")
@RequiredArgsConstructor
public class MarketDataController {

    private final MarketDataService marketDataService;

    @GetMapping("/prices")
    public ResponseEntity<?> getPrices() {
        try {
            return ResponseEntity.ok(marketDataService.getPrices());
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "❌ Failed to fetch market prices"));
        }
    }

    @GetMapping("/price/{symbol}")
    public ResponseEntity<?> getPrice(@PathVariable String symbol) {
        try {
            return ResponseEntity.ok(Map.of(
                "message", "Current price of " + symbol + ": $" + marketDataService.getPrice(symbol)
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "❌ Asset not found or price unavailable: " + symbol));
        }
    }
}
