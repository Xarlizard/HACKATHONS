package com.hackathon.blockchain.config;

import com.hackathon.blockchain.model.User;
import com.hackathon.blockchain.model.Wallet;
import com.hackathon.blockchain.repository.UserRepository;
import com.hackathon.blockchain.repository.WalletRepository;
import com.hackathon.blockchain.service.BlockchainService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class StartupRunner implements CommandLineRunner {

    private final BlockchainService blockchainService;
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;

    private static final Map<String, BigDecimal> INITIAL_LIQUIDITY = Map.of(
        "BTC", new BigDecimal("100000"),
        "ETH", new BigDecimal("400000"),
        "USDT", new BigDecimal("1000000"),
        "NCOIN", new BigDecimal("10000000"),
        "CCOIN", new BigDecimal("2000000")
    );

    @Override
    @Transactional
    public void run(String... args) {
        // Initialize blockchain with genesis block
        blockchainService.initializeBlockchain();

        // Create liquidity pool wallets
        INITIAL_LIQUIDITY.forEach((symbol, amount) -> {
            String walletName = "LP-" + symbol;
            User lpUser = userRepository.findByUsername(walletName)
                .orElseGet(() -> {
                    User newUser = new User(walletName, walletName + "@lp.com", "lp-password");
                    return userRepository.save(newUser);
                });

            walletRepository.findByUser(lpUser)
                .orElseGet(() -> {
                    Wallet wallet = new Wallet(lpUser, generateLPWalletAddress(symbol));
                    wallet.getAssets().put(symbol, amount);
                    return walletRepository.save(wallet);
                });
        });
    }

    private String generateLPWalletAddress(String symbol) {
        return "LP-" + symbol + "-" + System.currentTimeMillis();
    }
}
