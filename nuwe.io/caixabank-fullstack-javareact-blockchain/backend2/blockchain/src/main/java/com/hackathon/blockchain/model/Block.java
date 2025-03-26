package com.hackathon.blockchain.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.List;
import org.apache.commons.codec.digest.DigestUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "transactions")
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "block_index")
    private Long blockIndex;

    private Long timestamp;

    private String previousHash;

    private Integer nonce;

    private String hash;

    private boolean genesis;

    @OneToMany(mappedBy = "block", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Transaction> transactions;

    public Block(Long blockIndex, String previousHash, boolean genesis) {
        this.blockIndex = blockIndex;
        this.timestamp = System.currentTimeMillis();
        this.previousHash = previousHash;
        this.nonce = 0;
        this.genesis = genesis;
    }

    public String calculateHash() {
        return null;
    }

    public void mineBlock(int difficulty) {
        
    }
}
