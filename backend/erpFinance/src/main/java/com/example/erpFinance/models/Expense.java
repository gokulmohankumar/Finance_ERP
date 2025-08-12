package com.example.erpFinance.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDate expenseDate;

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    // --- NEW FIELDS FOR APPROVAL TRACKING ---

    /**
     * The timestamp when the expense was approved or denied.
     * This will be null if the status is PENDING.
     */
    private LocalDateTime approvedAt;

    /**
     * The reason provided by the accountant if the expense is denied.
     * This will be null for pending or approved expenses.
     */
    @Column(columnDefinition = "TEXT")
    private String denialReason;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExpenseStatus status; // PENDING, APPROVED, DENIED

    // --- Relationships ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private ExpenseCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "submitted_by_user_id", nullable = false)
    private User submittedBy;

    /**
     * NEW RELATIONSHIP: The user (e.g., Accountant) who approved or denied this expense.
     * This is nullable because it will be empty for pending expenses.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by_user_id")
    private User approvedBy;

    @OneToOne(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private ExpenseReceipt receipt;

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ExpenseComment> comments = new ArrayList<>();


    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    public ExpenseStatus getStatus() { return status; }
    public void setStatus(ExpenseStatus status) { this.status = status; }
    public ExpenseCategory getCategory() { return category; }
    public void setCategory(ExpenseCategory category) { this.category = category; }
    public User getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(User submittedBy) { this.submittedBy = submittedBy; }
    public ExpenseReceipt getReceipt() { return receipt; }
    public void setReceipt(ExpenseReceipt receipt) { this.receipt = receipt; }
    public List<ExpenseComment> getComments() { return comments; }
    public void setComments(List<ExpenseComment> comments) { this.comments = comments; }

    // Getters and Setters for new fields
    public LocalDateTime getApprovedAt() { return approvedAt; }
    public void setApprovedAt(LocalDateTime approvedAt) { this.approvedAt = approvedAt; }
    public String getDenialReason() { return denialReason; }
    public void setDenialReason(String denialReason) { this.denialReason = denialReason; }
    public User getApprovedBy() { return approvedBy; }
    public void setApprovedBy(User approvedBy) { this.approvedBy = approvedBy; }

    public enum ExpenseStatus {
        PENDING,
        APPROVED,
        DENIED
    }
}
