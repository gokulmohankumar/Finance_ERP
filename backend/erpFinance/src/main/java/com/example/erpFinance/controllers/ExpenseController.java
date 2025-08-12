package com.example.erpFinance.controllers;

import com.example.erpFinance.dto.ExpenseResponseDto; // Import the DTO
import com.example.erpFinance.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5174")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // ... your /submit POST mapping ...

    /**
     * API endpoint to fetch all pending expenses, now returning the DTO.
     */
    @GetMapping("/pending")
    public ResponseEntity<List<ExpenseResponseDto>> getPendingExpenses() {
        try {
            List<ExpenseResponseDto> pendingExpenses = expenseService.getPendingExpenses();
            return ResponseEntity.ok(pendingExpenses);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
