package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "student_confirmations")
@Data
public class StudentConfirmation {
    @Id
    @Column(name = "student_confirmation_code", length = 30)
    private String studentConfirmationCode;

    @Column(name = "confirmation_status")
    private Integer confirmationStatus;  // Mejor Integer para permitir null

    @ManyToOne
    @JoinColumn(name = "student_code")
    private Student student;

    @OneToOne(mappedBy = "studentConfirmation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private ConfirmationDocument confirmationDocument;
}
