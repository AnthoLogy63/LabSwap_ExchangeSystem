package com.example.backend.controller;

import com.example.backend.model.AdminConfirmation;
import com.example.backend.repo.AdminConfirmationRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Tag(name = "Confirmación del Administrador", description = "Operaciones para gestionar confirmaciones administrativas")
@RestController
@RequestMapping("/admin-confirmations")
public class AdminConfirmationController {

    @Autowired
    private AdminConfirmationRepository adminConfirmationRepository;

    @Operation(summary = "Crear una confirmación del administrador")
    @PostMapping
    public void create(@RequestBody AdminConfirmation confirmation) {
        confirmation.setConfirmationStatus(0); 
        adminConfirmationRepository.save(confirmation);
    }

    @Operation(summary = "Obtener una confirmación por su código")
    @GetMapping("/{id}")
    public AdminConfirmation getById(
            @Parameter(description = "Código de la confirmación") @PathVariable String id) {
        return adminConfirmationRepository.findById(id).orElse(null);
    }
}
