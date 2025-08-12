package com.example.erpFinance.services;

import com.example.erpFinance.dto.*; // Import the new DTOs
import com.example.erpFinance.models.Expense;
import com.example.erpFinance.models.User;
import com.example.erpFinance.repositories.ExpenseRepository;
import com.example.erpFinance.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userrepository;

    public List<ExpenseResponseDto> getPendingExpenses() {
        List<Expense> expenses = expenseRepository.findByStatusWithDetails(Expense.ExpenseStatus.PENDING);
return expenses.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ExpenseResponseDto convertToDto(Expense expense) {
        ExpenseResponseDto dto = new ExpenseResponseDto();
        dto.setId(expense.getId());
        dto.setTitle(expense.getTitle());
        dto.setDescription(expense.getDescription());
        dto.setAmount(expense.getAmount());
        dto.setExpenseDate(expense.getExpenseDate());
if (expense.getSubmittedBy() != null) {
            dto.setSubmittedBy(new UserDto(expense.getSubmittedBy().getId(), expense.getSubmittedBy().getUsername()));
        }
if (expense.getCategory() != null) {
            dto.setCategory(new CategoryDto(expense.getCategory().getId(), expense.getCategory().getName()));
        }
if (expense.getReceipt() != null) {
            dto.setReceipt(new ReceiptDto(expense.getReceipt().getId(), expense.getReceipt().getFileUrl()));
        }

        return dto;
    }

    public Expense approveExpense(Long expenseId, Long accountantId){
        Expense expense= expenseRepository.findById(expenseId).orElseThrow(()->new RuntimeException("Expense not found"));
        User accountant = userrepository.findById(accountantId).orElseThrow(()->new RuntimeException("accountant id is not found"));

        expense.setStatus(Expense.ExpenseStatus.APPROVED);

        return expenseRepository.save(expense);
    }
}
