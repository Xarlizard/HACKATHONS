package com.hackathon.blockchain.controller;

import com.hackathon.blockchain.dto.TradeRequest;
import com.hackathon.blockchain.model.User;
import com.hackathon.blockchain.model.Wallet;
import com.hackathon.blockchain.service.UserService;
import com.hackathon.blockchain.service.WalletService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/wallet")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createWallet(HttpSession session) {
        try {
            String username = (String) session.getAttribute("username");
            if (username == null) {
                return ResponseEntity.status(401)
                    .body(Map.of("message", "❌ You must be authenticated to create a wallet."));
            }

            User user = userService.findByUsername(username);
            Wallet wallet = walletService.createWallet(user);
            
            return ResponseEntity.ok(Map.of(
                "message", "✅ Wallet successfully created! Address: " + wallet.getAddress()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "❌ " + e.getMessage()));
        }
    }

    @GetMapping("/balance")
    public ResponseEntity<?> getBalance(HttpSession session) {
        try {
            String username = (String) session.getAttribute("username");
            if (username == null) {
                return ResponseEntity.status(401)
                    .body(Map.of("message", "❌ You must be authenticated"));
            }

            User user = userService.findByUsername(username);
            Wallet wallet = walletService.getWallet(user);

            return ResponseEntity.ok(Map.of(
                "wallet_address", wallet.getAddress(),
                "cash_balance", wallet.getCashBalance(),
                "net_worth", wallet.getNetWorth(),
                "assets", wallet.getAssets()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                .body(Map.of("message", "❌ " + e.getMessage()));
        }
    }

    @PostMapping("/buy")
    public ResponseEntity<?> buyAsset(@RequestBody TradeRequest request, HttpSession session) {
        try {
            String username = (String) session.getAttribute("username");
            if (username == null) {
                return ResponseEntity.status(401)
                    .body(Map.of("message", "❌ You must be authenticated to buy assets."));
            }

            User user = userService.findByUsername(username);
            walletService.buyAsset(user, request.getSymbol(), request.getQuantity());
            
            return ResponseEntity.ok(Map.of("message", "✅ Asset purchased successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "❌ " + e.getMessage()));
        }
    }

    @PostMapping("/sell")
    public ResponseEntity<?> sellAsset(@RequestBody TradeRequest request, HttpSession session) {
        try {
            String username = (String) session.getAttribute("username");
            if (username == null) {
                return ResponseEntity.status(401)
                    .body(Map.of("message", "❌ You must be authenticated to sell assets."));
            }

            User user = userService.findByUsername(username);
            walletService.sellAsset(user, request.getSymbol(), request.getQuantity());
            
            return ResponseEntity.ok(Map.of("message", "✅ Asset sold successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "❌ " + e.getMessage()));
        }
    }

    @GetMapping("/transactions")
    public ResponseEntity<?> getTransactions(HttpSession session) {
        try {
            String username = (String) session.getAttribute("username");
            if (username == null) {
                return ResponseEntity.status(401)
                    .body(Map.of("message", "❌ You must be authenticated."));
            }

            User user = userService.findByUsername(username);
            return ResponseEntity.ok(walletService.getTransactions(user));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                .body(Map.of("message", "❌ " + e.getMessage()));
        }
    }
}
