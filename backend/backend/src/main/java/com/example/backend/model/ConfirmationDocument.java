package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "confirmation_documents")
@Data
public class ConfirmationDocument {
    @Id
    private String documentCode;

    private String filename;

    @OneToOne
    @JoinColumn(name = "studentConfirmationCode", unique = true)
    private StudentConfirmation studentConfirmation;

    @PrePersist
    public void generateDocumentCode() {
        if (documentCode == null || documentCode.isEmpty()) {
            String prefix = "DOC";
            long timestamp = System.currentTimeMillis() % 1000000;
            this.documentCode = prefix + String.format("%06d", timestamp);
        }
    }

}
