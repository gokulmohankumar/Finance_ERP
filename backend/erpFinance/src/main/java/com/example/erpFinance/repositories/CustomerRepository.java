package com.example.erpFinance.repositories;


import com.example.erpFinance.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * A simple repository interface for the Customer entity.
 * By extending JpaRepository, we get all standard CRUD operations
 * (Create, Read, Update, Delete) for free without writing any code.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
