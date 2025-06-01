package com.example.backend.repo;

import com.example.backend.model.ConfirmationDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationDocumentRepository extends JpaRepository<ConfirmationDocument, String> {
    ConfirmationDocument findByStudentConfirmation_StudentConfirmationCode(String code);
}
