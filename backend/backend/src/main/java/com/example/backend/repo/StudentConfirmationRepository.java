package com.example.backend.repo;

import com.example.backend.model.StudentConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface StudentConfirmationRepository extends JpaRepository<StudentConfirmation, String> {
    List<StudentConfirmation> findByStudent_StudentCode(String studentCode);
    Optional<StudentConfirmation> findByStudent_StudentCodeAndExchange_ExchangeCode(String studentCode, String exchangeCode);
}
