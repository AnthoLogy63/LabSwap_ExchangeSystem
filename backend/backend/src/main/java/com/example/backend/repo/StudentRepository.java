package com.example.backend.repo;

import com.example.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findByStudentEmail(String studentEmail);
}
