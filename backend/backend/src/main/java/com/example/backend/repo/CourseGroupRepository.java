package com.example.backend.repo;

import com.example.backend.model.CourseGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseGroupRepository extends JpaRepository<CourseGroup, String> {
    List<CourseGroup> findByCourse_CourseCode(String courseCode);
    List<CourseGroup> findByGroupNameIgnoreCase(String groupName);
    
}
