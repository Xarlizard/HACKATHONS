package com.hackathon.blockchain.controller;

import com.hackathon.blockchain.model.Block;
import com.hackathon.blockchain.service.BlockchainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/blockchain")
@RequiredArgsConstructor
public class BlockchainController {

    private final BlockchainService blockchainService;

    @PostMapping("/mine")
    public ResponseEntity<?> mineBlock() {
        try {
            Block minedBlock = blockchainService.mineBlock();
            return ResponseEntity.ok(Map.of(
                "message", "Block mined: " + minedBlock.getHash()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getBlockchain() {
        return ResponseEntity.ok(blockchainService.getBlocks());
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateBlockchain() {
        boolean isValid = blockchainService.validateChain();
        return ResponseEntity.ok(Map.of(
            "message", "Blockchain valid: " + isValid
        ));
    }
}
