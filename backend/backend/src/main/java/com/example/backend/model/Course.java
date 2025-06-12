package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "courses")
@Data
public class Course {
    @Id
    private String courseCode;

    private String courseName;
    private int courseYear;
    @PrePersist
    
    public void generateCourseCode() {
        if (courseCode == null || courseCode.isEmpty()) {
            String prefix = "CRS";
            long timestamp = System.currentTimeMillis() % 1000000;
            this.courseCode = prefix + String.format("%06d", timestamp);
        }
    }

}
