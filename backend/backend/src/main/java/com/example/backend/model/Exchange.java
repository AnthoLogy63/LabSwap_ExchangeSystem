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
    @JoinColumn(name = "offeredCourseGroupCode")
    private CourseGroup offeredCourseGroup;

    @ManyToOne
    @JoinColumn(name = "desiredCourseGroupCode")
    private CourseGroup desiredCourseGroup;

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
            String prefix = "EXC";
            long timestamp = System.currentTimeMillis() % 1000000;
            this.exchangeCode = prefix + String.format("%06d", timestamp);
        }
    }


    // Métodos explícitos necesarios si Swagger o serialización los exige
    public CourseGroup getOfferedCourseGroup() {
        return offeredCourseGroup;
    }

    public CourseGroup getDesiredCourseGroup() {
        return desiredCourseGroup;
    }
}
