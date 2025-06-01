package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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

    @Column
    private String availableGroups;
}
