package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

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
}
