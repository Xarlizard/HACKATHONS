package com.hackathon.blockchain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assetSymbol;
    private BigDecimal amount;
    private BigDecimal pricePerUnit;
    
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    
    private LocalDateTime timestamp;
    
    @Enumerated(EnumType.STRING)
    private TransactionStatus status;
    
    private BigDecimal fee;
    
    private Long senderWalletId;
    private Long receiverWalletId;

    @ManyToOne
    @JoinColumn(name = "block_id")
    private Block block;

    public enum TransactionType {
        BUY, SELL
    }

    public enum TransactionStatus {
        PENDING, MINED
    }
}
