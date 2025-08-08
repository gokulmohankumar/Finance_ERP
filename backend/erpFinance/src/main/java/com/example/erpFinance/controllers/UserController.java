package com.example.erpFinance.controllers;


import com.example.erpFinance.models.User;
import com.example.erpFinance.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        User found = userService.login(user.getEmail(), user.getPassword());
        if (found != null) {
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    }
}
