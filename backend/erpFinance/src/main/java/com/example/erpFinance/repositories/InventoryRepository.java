package com.example.erpFinance.repositories;

import com.example.erpFinance.models.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * A simple repository interface for the Inventory entity.
 * It provides standard CRUD operations for the 'inventories' table.
 */
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
