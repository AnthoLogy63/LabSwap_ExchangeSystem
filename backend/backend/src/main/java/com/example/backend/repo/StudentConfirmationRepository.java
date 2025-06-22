package com.example.backend.repo;

import com.example.backend.model.StudentConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentConfirmationRepository extends JpaRepository<StudentConfirmation, String> {
    List<StudentConfirmation> findByStudent_StudentCode(String studentCode);

}
