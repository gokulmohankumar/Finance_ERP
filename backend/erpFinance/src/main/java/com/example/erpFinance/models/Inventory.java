package com.example.erpFinance.models;


import jakarta.persistence.*;

import java.math.BigDecimal;

/**
 * Represents an Inventory item in the database.
 * This class maps to the 'inventories' table.
 */
@Entity
@Table(name = "inventories")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="inventory_id")
    private Long id;
    private String productName;
    private String category;
    private Integer stockQuantity;
    private Integer reorderLevel;
    private BigDecimal pricePerUnit;

    // Default constructor required by JPA
    public Inventory() {
    }

    public Inventory(String productName, String category, Integer stockQuantity, Integer reorderLevel, BigDecimal pricePerUnit) {
        this.productName = productName;
        this.category = category;
        this.stockQuantity = stockQuantity;
        this.reorderLevel = reorderLevel;
        this.pricePerUnit = pricePerUnit;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Integer getReorderLevel() {
        return reorderLevel;
    }

    public void setReorderLevel(Integer reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }
}

