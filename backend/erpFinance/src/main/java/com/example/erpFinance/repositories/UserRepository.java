package com.example.erpFinance.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.erpFinance.models.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
