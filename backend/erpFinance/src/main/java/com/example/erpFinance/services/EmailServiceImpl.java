package com.example.erpFinance.services;

import com.example.erpFinance.dto.WelcomeEmailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
public class EmailServiceImpl implements EmailService{
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;


    @Override
    public void sendWelcomeEmail(WelcomeEmailRequest request) throws MessagingException {
        Context context = new Context();

        context.setVariable("username",request.getUsername());
        context.setVariable("role",request.getRole());
        context.setVariable("loginUrl","http://localhost:5174/login");

        String htmlBody = templateEngine.process("greetings.html",context);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true,"UTF-8");

        helper.setFrom("no-replay@financierp.com");
        helper.setTo(request.getTo());
        helper.setSubject("Welcome to FinancierERP!");
        helper.setText(htmlBody,true);
        mailSender.send(mimeMessage);
    }

    @Override
    public void sendDisableEmail(WelcomeEmailRequest request) throws MessagingException {
        Context context = new Context();

        context.setVariable("username",request.getUsername());
        context.setVariable("role",request.getRole());


        String htmlBody = templateEngine.process("disabled.html",context);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true,"UTF-8");

        helper.setFrom("no-replay@financierp.com");
        helper.setTo(request.getTo());
        helper.setSubject("Your Account Has been Disabled");
        helper.setText(htmlBody,true);
        mailSender.send(mimeMessage);
    }

    @Override
    public void sendSimpleMessages(String to, String subject, String text) {

    }
}
