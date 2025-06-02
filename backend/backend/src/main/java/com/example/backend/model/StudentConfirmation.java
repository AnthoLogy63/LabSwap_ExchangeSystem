package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

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

    @PrePersist
    public void generateStudentConfirmationCode() {
        if (studentConfirmationCode == null || studentConfirmationCode.isEmpty()) {
            this.studentConfirmationCode = "SCF" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }
}

}
