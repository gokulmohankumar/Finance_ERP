// src/main/java/com/example/erpFinance/models/ExpenseComment.java
package com.example.erpFinance.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "expense_comments")
public class ExpenseComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String commentText;

    @Column(nullable = false)
    private LocalDateTime commentedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author; // The user who wrote the comment

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expense_id", nullable = false)
    private Expense expense;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public LocalDateTime getCommentedAt() {
        return commentedAt;
    }

    public void setCommentedAt(LocalDateTime commentedAt) {
        this.commentedAt = commentedAt;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Expense getExpense() {
        return expense;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }
}