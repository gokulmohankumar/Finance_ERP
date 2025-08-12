package com.example.erpFinance.config; // Or your main package

import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

@Configuration
public class FileUploadConfig {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();

        // Set the maximum file size (e.g., 10MB)
        factory.setMaxFileSize(DataSize.ofMegabytes(10));

        // Set the total request size (e.g., 10MB)
        factory.setMaxRequestSize(DataSize.ofMegabytes(10));

        return factory.createMultipartConfig();
    }
}