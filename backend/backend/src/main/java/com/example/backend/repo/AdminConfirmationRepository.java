package com.example.backend.repo;

import com.example.backend.model.AdminConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;



public interface AdminConfirmationRepository extends JpaRepository<AdminConfirmation, String> {
}
