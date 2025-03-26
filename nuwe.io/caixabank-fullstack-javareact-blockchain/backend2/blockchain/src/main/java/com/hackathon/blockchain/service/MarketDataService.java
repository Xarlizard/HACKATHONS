package com.hackathon.blockchain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MarketDataService {
    
    private final RestTemplate restTemplate;
    private final String MARKET_API_URL = "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-3d8ede30-848f-4a7a-acc2-22ba0cd9a382/default/fake-market-prices";

    public Map<String, BigDecimal> getPrices() {
        try {
            ResponseEntity<Map<String, BigDecimal>> response = restTemplate.exchange(
                MARKET_API_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, BigDecimal>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch market prices");
        }
    }

    public BigDecimal getPrice(String symbol) {
        Map<String, BigDecimal> prices = getPrices();
        if (!prices.containsKey(symbol)) {
            throw new RuntimeException("Price not available for: " + symbol);
        }
        return prices.get(symbol);
    }
}
