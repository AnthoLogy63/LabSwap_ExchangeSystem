package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "student_confirmations")
@Data
public class StudentConfirmation {
    @Id
    private String studentConfirmationCode;
    private int confirmationStatus; 

    @ManyToOne
    @JoinColumn(name = "studentCode")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "exchangeCode")
    private Exchange exchange;

}
