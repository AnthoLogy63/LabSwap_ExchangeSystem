package com.example.backend.controller;

import com.example.backend.model.AdminConfirmation;
import com.example.backend.repo.AdminConfirmationRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @Operation(summary = "Obtener confirmaciones por código de intercambio")
    @GetMapping("/by-exchange/{exchangeCode}")
    public List<AdminConfirmation> getByExchangeCode(
            @Parameter(description = "Código del intercambio") @PathVariable String exchangeCode) {
        return adminConfirmationRepository.findByExchange_ExchangeCode(exchangeCode);
    }

    @Operation(summary = "Obtener una confirmación por su código")
    @GetMapping("/{id}")
    public AdminConfirmation getById(
            @Parameter(description = "Código de la confirmación") @PathVariable String id) {
        return adminConfirmationRepository.findById(id).orElse(null);
    }

    @Operation(summary = "Actualizar estado por código de intercambio: 0 = Sin revisar, 1 = Admitido, 2 = Rechazado")
    @PutMapping("/exchange/{exchangeCode}/status/{status}")
    public void updateStatusByExchangeCode(
            @PathVariable String exchangeCode,
            @PathVariable int status) {
        List<AdminConfirmation> list = adminConfirmationRepository.findByExchange_ExchangeCode(exchangeCode);
        if (!list.isEmpty() && status >= 0 && status <= 2) {
            AdminConfirmation confirmation = list.get(0);
            confirmation.setConfirmationStatus(status);
            adminConfirmationRepository.save(confirmation);
        }
    }
}
