package com.example.erpFinance.dto;

public class ExpenseResponseDto {
    private Long id;
    private String title;
    private String description;
    private java.math.BigDecimal amount;
    private java.time.LocalDate expenseDate;
    private UserDto submittedBy;
    private CategoryDto category;
    private ReceiptDto receipt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public java.math.BigDecimal getAmount() { return amount; }
    public void setAmount(java.math.BigDecimal amount) { this.amount = amount; }
    public java.time.LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(java.time.LocalDate expenseDate) { this.expenseDate = expenseDate; }
    public UserDto getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(UserDto submittedBy) { this.submittedBy = submittedBy; }
    public CategoryDto getCategory() { return category; }
    public void setCategory(CategoryDto category) { this.category = category; }
    public ReceiptDto getReceipt() { return receipt; }
    public void setReceipt(ReceiptDto receipt) { this.receipt = receipt; }
}
