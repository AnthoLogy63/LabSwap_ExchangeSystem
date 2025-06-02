package com.example.backend.repo;

import com.example.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, String> {
    List<Course> findByCourseName(String name);
    List<Course> findByCourseYear(int courseYear);
    List<Course> findByAvailableGroupsContainingIgnoreCase(String group); 
}
