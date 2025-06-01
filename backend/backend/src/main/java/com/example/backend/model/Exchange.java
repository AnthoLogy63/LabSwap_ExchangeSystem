package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Data
@Entity
@Table(name = "exchanges")
public class Exchange {
    @Id
    private String exchangeCode;

    @ManyToOne
    @JoinColumn(name = "studentCode1")
    private Student student1;

    @ManyToOne
    @JoinColumn(name = "studentCode2")
    private Student student2;

    @ManyToOne
    @JoinColumn(name = "courseCode1")
    private Course course1;

    @ManyToOne
    @JoinColumn(name = "courseCode2")
    private Course course2;

    @ManyToOne
    @JoinColumn(name = "studentConfirmationCode1")
    private StudentConfirmation studentConfirmation1;

    @ManyToOne
    @JoinColumn(name = "studentConfirmationCode2")
    private StudentConfirmation studentConfirmation2;

    @ManyToOne
    @JoinColumn(name = "adminConfirmationCode")
    private AdminConfirmation adminConfirmation;

    @PrePersist
    public void generateExchangeCode() {
        if (exchangeCode == null || exchangeCode.isEmpty()) {
            this.exchangeCode = "EXC" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }
    }


}
