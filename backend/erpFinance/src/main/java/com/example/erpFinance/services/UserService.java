package com.example.erpFinance.services;


import com.example.erpFinance.models.User;

import java.util.List;

public interface UserService {
    User register(User user);
    User login(String email, String password);
    List<User> getAllUser();
    User activateUser(Long id);
    User deactivateUser(long id);
    void deleteUser(Long id);
}