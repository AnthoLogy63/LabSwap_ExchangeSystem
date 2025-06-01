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
    public void generateAdminConfirmationCode() {
        if (documentCode == null || documentCode.isEmpty()) {
            this.documentCode = "ACF" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }
    }
}
