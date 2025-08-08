package com.example.erpFinance.services;


import com.example.erpFinance.models.User;

public interface UserService {
    User register(User user);
    User login(String email, String password);
}