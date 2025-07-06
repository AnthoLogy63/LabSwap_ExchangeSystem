package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "student_confirmations")
@Data
public class StudentConfirmation {
    @Id
    @Column(name = "student_confirmation_code", length = 20)
    private String studentConfirmationCode;

    @Column(name = "confirmation_status")
    private Integer confirmationStatus;  // Mejor Integer para permitir null

    @ManyToOne
    @JoinColumn(name = "student_code")
    private Student student;
}
