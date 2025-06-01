package com.example.backend.repo;

import com.example.backend.model.AdminConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminConfirmationRepository extends JpaRepository<AdminConfirmation, String> {
    List<AdminConfirmation> findByExchange_ExchangeCode(String exchangeCode);
}
