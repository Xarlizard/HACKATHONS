package com.hackathon.inditex.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackathon.inditex.Entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(String status);
}