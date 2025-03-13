package com.hackathon.blockchain.service;

import com.hackathon.blockchain.exception.BlockchainException;
import com.hackathon.blockchain.model.Block;
import com.hackathon.blockchain.model.Transaction;
import com.hackathon.blockchain.repository.BlockRepository;
import com.hackathon.blockchain.repository.TransactionRepository;
import com.hackathon.blockchain.utils.HashUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlockchainService {

    private final BlockRepository blockRepository;
    private final TransactionRepository transactionRepository;
    private final HashUtil hashUtil;
    private static final int DIFFICULTY = 4;

    @Transactional
    public void initializeBlockchain() {
        if (blockRepository.count() == 0) {
            Block genesisBlock = new Block(0L, "0", true);
            mineBlock(genesisBlock);
            blockRepository.save(genesisBlock);
        }
    }

    @Transactional
    public Block mineBlock() {
        List<Transaction> pendingTransactions = transactionRepository.findByStatusOrderByTimestampAsc(
            Transaction.TransactionStatus.PENDING
        );

        if (pendingTransactions.isEmpty()) {
            throw new BlockchainException("❌ No pending transactions to mine.");
        }

        Block lastBlock = blockRepository.findTopByOrderByBlockIndexDesc()
            .orElseThrow(() -> new BlockchainException("Blockchain not initialized"));

        Block newBlock = new Block(
            lastBlock.getBlockIndex() + 1,
            lastBlock.getHash(),
            false
        );

        mineBlock(newBlock);
        Block savedBlock = blockRepository.save(newBlock);

        // Update transactions
        pendingTransactions.forEach(tx -> {
            tx.setStatus(Transaction.TransactionStatus.MINED);
            tx.setBlock(savedBlock);
        });
        transactionRepository.saveAll(pendingTransactions);

        return savedBlock;
    }

    private void mineBlock(Block block) {
        String prefix = "0".repeat(DIFFICULTY);
        while (true) {
            block.setNonce(block.getNonce() + 1);
            String hash = hashUtil.calculateHash(block);
            if (hash.startsWith(prefix)) {
                block.setHash(hash);
                break;
            }
        }
    }

    public boolean validateChain() {
        List<Block> blocks = blockRepository.findAll();
        for (int i = 1; i < blocks.size(); i++) {
            Block currentBlock = blocks.get(i);
            Block previousBlock = blocks.get(i - 1);

            // Validate hash connection
            if (!currentBlock.getPreviousHash().equals(previousBlock.getHash())) {
                return false;
            }

            // Validate current block hash
            String calculatedHash = hashUtil.calculateHash(currentBlock);
            if (!calculatedHash.equals(currentBlock.getHash())) {
                return false;
            }
        }
        return true;
    }

    @Transactional(readOnly = true)
    public List<Block> getBlocks() {
        return blockRepository.findAll();
    }
}
