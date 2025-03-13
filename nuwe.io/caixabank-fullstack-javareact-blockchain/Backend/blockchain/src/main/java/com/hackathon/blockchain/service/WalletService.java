package com.hackathon.blockchain.service;

import com.hackathon.blockchain.exception.WalletException;
import com.hackathon.blockchain.model.Transaction;
import com.hackathon.blockchain.model.User;
import com.hackathon.blockchain.model.Wallet;
import com.hackathon.blockchain.repository.TransactionRepository;
import com.hackathon.blockchain.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final MarketDataService marketDataService;

    @Transactional
    public Wallet createWallet(User user) {
        if (walletRepository.findByUser(user).isPresent()) {
            throw new WalletException("User already has a wallet");
        }

        String address = generateWalletAddress();
        Wallet wallet = new Wallet(user, address);
        return walletRepository.save(wallet);
    }

    @Transactional(readOnly = true)
    public Wallet getWallet(User user) {
        return walletRepository.findByUser(user)
            .orElseThrow(() -> new WalletException("Wallet not found"));
    }

    @Transactional
    public void buyAsset(User user, String symbol, BigDecimal quantity) {
        Wallet wallet = getWallet(user);
        Map<String, BigDecimal> prices = marketDataService.getPrices();
        
        if (!prices.containsKey(symbol)) {
            throw new WalletException("Asset not available: " + symbol);
        }
        
        BigDecimal price = prices.get(symbol);
        BigDecimal totalCost = price.multiply(quantity);

        // Get liquidity pool wallet
        Wallet lpWallet = walletRepository.findByAddress("LP-" + symbol)
            .orElseThrow(() -> new WalletException("Liquidity pool not found"));

        if (symbol.equals("USDT")) {
            if (wallet.getCashBalance().compareTo(totalCost) < 0) {
                throw new WalletException("Insufficient funds");
            }
            wallet.setCashBalance(wallet.getCashBalance().subtract(totalCost));
        } else {
            BigDecimal usdtBalance = wallet.getAssets().getOrDefault("USDT", BigDecimal.ZERO);
            if (usdtBalance.compareTo(totalCost) < 0) {
                throw new WalletException("Insufficient USDT balance");
            }
            wallet.getAssets().put("USDT", usdtBalance.subtract(totalCost));
        }

        // Create transaction
        Transaction transaction = new Transaction();
        transaction.setAssetSymbol(symbol);
        transaction.setAmount(quantity);
        transaction.setPricePerUnit(price);
        transaction.setType(Transaction.TransactionType.BUY);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setStatus(Transaction.TransactionStatus.PENDING);
        transaction.setSenderWalletId(wallet.getId());
        transaction.setReceiverWalletId(lpWallet.getId());
        
        // Update balances
        wallet.getAssets().merge(symbol, quantity, BigDecimal::add);
        lpWallet.getAssets().merge(symbol, quantity, BigDecimal::subtract);
        
        // Save everything
        walletRepository.save(wallet);
        walletRepository.save(lpWallet);
        transactionRepository.save(transaction);
    }

    @Transactional
    public void sellAsset(User user, String symbol, BigDecimal quantity) {
        Wallet wallet = getWallet(user);
        BigDecimal currentBalance = wallet.getAssets().getOrDefault(symbol, BigDecimal.ZERO);
        
        if (currentBalance.compareTo(quantity) < 0) {
            throw new WalletException("Insufficient asset balance");
        }

        Map<String, BigDecimal> prices = marketDataService.getPrices();
        if (!prices.containsKey(symbol)) {
            throw new WalletException("Asset not available: " + symbol);
        }
        
        BigDecimal price = prices.get(symbol);
        BigDecimal revenue = price.multiply(quantity);

        // Get liquidity pool wallet
        Wallet lpWallet = walletRepository.findByAddress("LP-" + symbol)
            .orElseThrow(() -> new WalletException("Liquidity pool not found"));

        // Create transaction
        Transaction transaction = new Transaction();
        transaction.setAssetSymbol(symbol);
        transaction.setAmount(quantity);
        transaction.setPricePerUnit(price);
        transaction.setType(Transaction.TransactionType.SELL);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setStatus(Transaction.TransactionStatus.PENDING);
        transaction.setSenderWalletId(wallet.getId());
        transaction.setReceiverWalletId(lpWallet.getId());

        // Update balances
        wallet.getAssets().merge(symbol, quantity, BigDecimal::subtract);
        wallet.getAssets().merge("USDT", revenue, BigDecimal::add);
        lpWallet.getAssets().merge(symbol, quantity, BigDecimal::add);
        lpWallet.getAssets().merge("USDT", revenue, BigDecimal::subtract);

        // Save everything
        walletRepository.save(wallet);
        walletRepository.save(lpWallet);
        transactionRepository.save(transaction);
    }

    @Transactional(readOnly = true)
    public Map<String, List<Transaction>> getTransactions(User user) {
        Wallet wallet = getWallet(user);
        List<Transaction> transactions = transactionRepository
            .findBySenderWalletIdOrReceiverWalletId(wallet.getId(), wallet.getId());
        
        return Map.of(
            "sent", transactions.stream()
                .filter(tx -> tx.getSenderWalletId().equals(wallet.getId()))
                .collect(Collectors.toList()),
            "received", transactions.stream()
                .filter(tx -> tx.getReceiverWalletId().equals(wallet.getId()))
                .collect(Collectors.toList())
        );
    }

    private String generateWalletAddress() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 32);
    }
}