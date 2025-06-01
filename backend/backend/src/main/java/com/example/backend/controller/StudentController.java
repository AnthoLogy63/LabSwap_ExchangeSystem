package com.example.backend.controller;

import com.example.backend.model.Student;
import com.example.backend.repo.StudentRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Tag(name = "Estudiantes", description = "Operaciones relacionadas con los estudiantes en Lab Swap")
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Operation(summary = "Crear un estudiante")
    @PostMapping
    public void createStudent(@RequestBody Student student) {
        studentRepository.save(student);
    }

    @Operation(summary = "Obtener todos los estudiantes")
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Operation(summary = "Obtener un estudiante por su código")
    @GetMapping("/{id}")
    public Student getStudentById(
            @Parameter(description = "Código del estudiante") @PathVariable String id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Operation(summary = "Editar correo, celular o año de estudio de un estudiante")
    @PutMapping("/{id}")
    public void updateStudent(
            @Parameter(description = "Código del estudiante") @PathVariable String id,
            @RequestBody Student updated) {
        Optional<Student> optional = studentRepository.findById(id);
        if (optional.isPresent()) {
            Student student = optional.get();
            student.setStudentEmail(updated.getStudentEmail());
            student.setStudentPhone(updated.getStudentPhone());
            student.setYearStudy(updated.getYearStudy());
            studentRepository.save(student);
        }
    }

    @Operation(summary = "Subir imagen de perfil de un estudiante")
    @PostMapping("/{id}/upload-image")
    public void uploadImage(
            @Parameter(description = "Código del estudiante") @PathVariable String id,
            @RequestParam("file") MultipartFile file) throws IOException {
        Optional<Student> optional = studentRepository.findById(id);
        if (optional.isPresent()) {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get("uploads/profile-images");
            Files.createDirectories(uploadPath);
            Path filePath = uploadPath.resolve(fileName);
            file.transferTo(filePath.toFile());

            Student student = optional.get();
            student.setProfileImageName(fileName);
            student.setProfileImagePath("uploads/profile-images");
            studentRepository.save(student);
        }
    }
}
