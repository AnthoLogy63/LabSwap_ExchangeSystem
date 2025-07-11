package com.example.backend.controller;

import com.example.backend.model.StudentConfirmation;
import com.example.backend.repo.StudentConfirmationRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

@Tag(name = "Confirmación de Estudiantes", description = "Operaciones para gestionar confirmaciones de estudiantes")
@RestController
@RequestMapping("/student-confirmations")
public class StudentConfirmationController {

    @Autowired
    private StudentConfirmationRepository repo;

    @Operation(summary = "Crear una confirmación de estudiante")
    @PostMapping
    public StudentConfirmation create(@RequestBody StudentConfirmation confirmation) {
    if (confirmation.getStudentConfirmationCode() == null || confirmation.getStudentConfirmationCode().isBlank()) {
    confirmation.setStudentConfirmationCode("SCF" + UUID.randomUUID().toString().replace("-", "").substring(0, 10).toUpperCase());
}
    if (confirmation.getConfirmationStatus() == null) {
        confirmation.setConfirmationStatus(0);
    }
    return repo.save(confirmation);
}
    @Operation(summary = "Consultar confirmaciones por estudiante")
    @GetMapping("/by-student/{studentCode}")
    public List<StudentConfirmation> getByStudent(@PathVariable String studentCode) {
        return repo.findByStudent_StudentCode(studentCode);
    }
    
    @Operation(summary = "Actualizar confirmación si aún no está confirmada")
    @PutMapping("/{id}")
    public void updateConfirmation(@PathVariable String id, @RequestBody StudentConfirmation update) {
        Optional<StudentConfirmation> existing = repo.findById(id);
        if (existing.isPresent() && existing.get().getConfirmationStatus() == 0) {
            StudentConfirmation conf = existing.get();
            conf.setConfirmationStatus(update.getConfirmationStatus());
            repo.save(conf);
        }
    }
}
