package com.hackathon.blockchain.repository;

import com.hackathon.blockchain.model.Wallet;
import com.hackathon.blockchain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByUser(User user);
    Optional<Wallet> findByAddress(String address);
    boolean existsByAddress(String address);
}

