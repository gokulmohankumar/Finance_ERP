package com.example.erpFinance.services;


import com.example.erpFinance.models.User;
import com.example.erpFinance.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepository userRepository;

    @Override
    public User register(User user) {
        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User activateUser(Long id) {
        User user = userRepository.findById(id) .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        user.setActiveUser(true);
        return userRepository.save(user);
    }
    @Transactional // <-- This annotation will now work correctly
    @Override
    public User deactivateUser(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        logger.info("Found user [ID: {}]. Current active status: {}", user.getId(), user.isActiveUser());

        user.setActiveUser(false);
        logger.info("Attempting to save user [ID: {}] with new active status: {}", user.getId(), user.isActiveUser());

        User savedUser = userRepository.save(user);

        logger.info("Save method executed. Returned user has active status: {}", savedUser.isActiveUser());

        return savedUser;
    }
    @Transactional
    @Override
    public void deleteUser(Long id) {
            if(!userRepository.existsById(id)){
                throw new EntityNotFoundException("User not found in this Id");
            }
            userRepository.deleteById(id);

    }
}