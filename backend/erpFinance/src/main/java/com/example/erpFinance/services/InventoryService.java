package com.example.erpFinance.services;

import com.example.erpFinance.models.Inventory;
import com.example.erpFinance.repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * The Service layer for managing Inventory entities.
 * This class encapsulates the business logic for inventory-related actions.
 */
@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }

    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Optional<Inventory> updateInventory(Long id, Inventory updatedInventory) {
        return inventoryRepository.findById(id).map(inventory -> {
            inventory.setProductName(updatedInventory.getProductName());
            inventory.setCategory(updatedInventory.getCategory());
            inventory.setStockQuantity(updatedInventory.getStockQuantity());
            inventory.setReorderLevel(updatedInventory.getReorderLevel());
            inventory.setPricePerUnit(updatedInventory.getPricePerUnit());
            return inventoryRepository.save(inventory);
        });
    }

    public boolean deleteInventory(Long id) {
        if (inventoryRepository.existsById(id)) {
            inventoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}