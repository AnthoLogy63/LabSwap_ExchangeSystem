package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "course_groups")
public class CourseGroup {

    @Id
    private String courseGroupCode;

    @ManyToOne
    @JoinColumn(name = "courseCode")
    private Course course;

    private String groupName;

    @PrePersist
    public void generateCourseGroupCode() {
        if (courseGroupCode == null || courseGroupCode.isEmpty()) {
            String prefix = "GRP";
            long timestamp = System.currentTimeMillis() % 1000000;
            this.courseGroupCode = prefix + String.format("%06d", timestamp);
        }
    }

}
