package com.example.erpFinance.dto;

public class ReceiptDto {
    private Long id;
    private String fileUrl;

    public ReceiptDto(Long id, String fileUrl) {
        this.id = id;
        this.fileUrl = fileUrl;
    }
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
}
