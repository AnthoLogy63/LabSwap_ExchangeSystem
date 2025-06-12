package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "students")
public class Student {

    @Id
    private String studentCode;

    private String studentName;

    @Column(nullable = false)
    private String studentEmail; 

    @Column(name = "alt_email")
    private String studentAltEmail; 

    @Column(nullable = false)
    private String studentPhone;

    @Column(nullable = false)
    private int yearStudy;

    @Column(name = "profile_image_name")
    private String profileImageName;

    @Column(name = "profile_image_path")
    private String profileImagePath;

    @PrePersist
    public void generateStudentCode() {
        if (studentCode == null || studentCode.isEmpty()) {
            String prefix = "STU";
            long timestamp = System.currentTimeMillis() % 1000000;
            this.studentCode = prefix + String.format("%06d", timestamp);
        }
    }
}
