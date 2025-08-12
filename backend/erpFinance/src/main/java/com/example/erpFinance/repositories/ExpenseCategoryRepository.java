package com.example.erpFinance.repositories;

import com.example.erpFinance.models.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory,Long>{

}
