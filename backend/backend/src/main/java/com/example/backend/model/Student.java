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
    private String studentEmail;
    private String studentPhone;
    private int yearStudy;   

    @Column(name = "profile_image_name")
    private String profileImageName;

    @Column(name = "profile_image_path")
    private String profileImagePath;
}
