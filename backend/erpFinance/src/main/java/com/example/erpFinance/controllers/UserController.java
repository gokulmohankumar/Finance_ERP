package com.example.erpFinance.controllers;


import com.example.erpFinance.models.User;
import com.example.erpFinance.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.proxy.EntityNotFoundDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public List<User> getUsers()
    {
        return userService.getAllUser();
    }
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.register(user);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) { // <-- 1. Change return type
        try {
            User foundUser = userService.login(user.getEmail(), user.getPassword());

            if (foundUser != null) {
                // 2. On success, return the 'foundUser' object with a 200 OK status.
                // Spring will automatically convert this to JSON.
                return ResponseEntity.ok(foundUser);
            } else {
                // 3. On failure, return a proper 401 Unauthorized error.
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            // Handle any unexpected errors.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login.");
        }
    }

    @PutMapping("/activate/{id}")
    public ResponseEntity<User> activte(@PathVariable Long id){
    try {
        User updateUser = userService.activateUser(id);
        return ResponseEntity.ok(updateUser);
    }catch(Exception e){
        return ResponseEntity.notFound().build();
    }
    }

    @PutMapping("/deactivate/{id}")
    public ResponseEntity<User> deactivte(@PathVariable Long id){
        try {
            User updateUser = userService.deactivateUser(id);
            return ResponseEntity.ok(updateUser);
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/allusers")
    public List<User> getAllUsers(){
    return userService.getAllUser();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        try{
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        }catch(EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }
}
