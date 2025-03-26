package com.hackathon.blockchain.repository;

import com.hackathon.blockchain.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByStatusOrderByTimestampAsc(Transaction.TransactionStatus status);
    List<Transaction> findBySenderWalletIdOrReceiverWalletId(Long senderWalletId, Long receiverWalletId);
}
