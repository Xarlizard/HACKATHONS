package com.hackathon.blockchain.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.codec.digest.DigestUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;

    @ManyToOne
    private User user;

    private BigDecimal cashBalance = BigDecimal.ZERO;

    @ElementCollection
    @CollectionTable(name = "wallet_assets")
    @MapKeyColumn(name = "asset_symbol")
    @Column(name = "amount")
    private Map<String, BigDecimal> assets = new HashMap<>();

    public Wallet(User user, String address) {
        this.user = user;
        this.address = address;
        this.cashBalance = new BigDecimal("100000.00"); // Initial balance
    }

    public BigDecimal getNetWorth() {
        return cashBalance;  // TODO: Add asset values when market data is available
    }
}