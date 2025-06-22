package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

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

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    public void setCreatedAt() {
        this.createdAt = new Date();
    }
}
