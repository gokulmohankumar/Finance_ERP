// src/main/java/com/example/erpFinance/repository/ExpenseRepository.java
package com.example.erpFinance.repositories;

import com.example.erpFinance.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // Import Query
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    /**
     * Finds all expenses with a specific status and eagerly fetches all related data
     * (submittedBy, category, receipt) in a single, efficient query to prevent
     * lazy loading exceptions.
     */
    @Query("SELECT e FROM Expense e " +
            "LEFT JOIN FETCH e.submittedBy " +
            "LEFT JOIN FETCH e.category " +
            "LEFT JOIN FETCH e.receipt " +
            "WHERE e.status = :status")
    List<Expense> findByStatusWithDetails(Expense.ExpenseStatus status);
}