package com.example.erpFinance.services;
import com.example.erpFinance.dto.WelcomeEmailRequest;
import com.example.erpFinance.models.User;
import jakarta.mail.MessagingException;
public interface EmailService {
    void sendWelcomeEmail(WelcomeEmailRequest request) throws MessagingException;
    void sendDisableEmail(WelcomeEmailRequest request) throws MessagingException;
    void sendSimpleMessages(String to,String subject ,String text );
}
