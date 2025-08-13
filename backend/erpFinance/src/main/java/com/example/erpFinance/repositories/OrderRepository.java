package com.example.erpFinance.repositories;


import com.example.erpFinance.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * A simple repository interface for the Order entity.
 * It provides standard CRUD operations for the 'orders' table.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
