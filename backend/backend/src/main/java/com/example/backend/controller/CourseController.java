package com.example.backend.controller;

import com.example.backend.model.Course;
import com.example.backend.repo.CourseRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Cursos", description = "Operaciones para consultar cursos por nombre (en mayúsculas), año o grupo")
@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Operation(summary = "Obtener todos los cursos")
    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Operation(summary = "Obtener un curso por su código")
    @GetMapping("/{id}")
    public Course getCourseById(
            @Parameter(description = "Código del curso") @PathVariable String id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Operation(summary = "Buscar cursos por nombre exacto (en mayúsculas)")
    @GetMapping("/name/{name}")
    public List<Course> getByName(
            @Parameter(description = "Nombre del curso en mayúsculas (ej. ALGEBRA)") @PathVariable String name) {
        return courseRepository.findByCourseName(name.toUpperCase());
    }

    @Operation(summary = "Filtrar cursos por año")
    @GetMapping("/year/{year}")
    public List<Course> getByYear(
            @Parameter(description = "Año del curso (1 a 5)") @PathVariable int year) {
        return courseRepository.findByCourseYear(year);
    }

    @Operation(summary = "Filtrar cursos por grupo")
    @GetMapping("/group/{group}")
    public List<Course> getByGroup(
            @Parameter(description = "Grupo del curso (A, B, C...)") @PathVariable String group) {
        return courseRepository.findAll().stream()
                .filter(course -> course.getAvailableGroups() != null &&
                        List.of(course.getAvailableGroups().split(","))
                                .contains(group.toUpperCase()))
                .toList();
    }

    @Operation(summary = "Obtener solo los nombres de todos los cursos")
    @GetMapping("/names")
    public List<String> getAllCourseNames() {
        return courseRepository.findAll().stream()
                .map(Course::getCourseName)
                .distinct()
                .toList();
    }

    @Operation(summary = "Obtener nombres de cursos por año")
    @GetMapping("/names/year/{year}")
    public List<String> getCourseNamesByYear(
            @Parameter(description = "Año del curso (1 a 5)") @PathVariable int year) {
        return courseRepository.findByCourseYear(year).stream()
                .map(Course::getCourseName)
                .distinct()
                .toList();
    }

    @Operation(summary = "Obtener nombres de cursos por grupo")
    @GetMapping("/names/group/{group}")
    public List<String> getCourseNamesByGroup(
            @Parameter(description = "Grupo del curso (A, B, C...)") @PathVariable String group) {
        return courseRepository.findAll().stream()
                .filter(course -> course.getAvailableGroups() != null &&
                        List.of(course.getAvailableGroups().split(","))
                                .contains(group.toUpperCase()))
                .map(Course::getCourseName)
                .distinct()
                .toList();
    }

    @Operation(summary = "Registrar un nuevo curso (opcional)")
    @PostMapping
    public void createCourse(@RequestBody Course course) {
        course.setCourseName(course.getCourseName().toUpperCase());
        course.setAvailableGroups(course.getAvailableGroups().toUpperCase());
        courseRepository.save(course);
    }
}
