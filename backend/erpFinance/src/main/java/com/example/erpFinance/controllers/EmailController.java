package com.example.erpFinance.controllers;
import com.example.erpFinance.dto.WelcomeEmailRequest;
import com.example.erpFinance.services.EmailService;
import com.example.erpFinance.services.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/email")

public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-welcome")
    public ResponseEntity<String> sendWelcomeEmail(@RequestBody WelcomeEmailRequest request) {
        try {
            emailService.sendWelcomeEmail(request);
            return ResponseEntity.ok("Welcome email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error while sending email: " + e.getMessage());
        }
    }

    @PostMapping("/disabled")
    public ResponseEntity<String> sendDisabledEmail(@RequestBody WelcomeEmailRequest request) {
        try {
            emailService.sendDisableEmail(request);
            return ResponseEntity.ok("Disabled email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error while sending email: " + e.getMessage());
        }
    }

}
