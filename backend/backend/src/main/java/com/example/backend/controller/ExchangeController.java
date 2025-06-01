package com.example.backend.controller;

import com.example.backend.model.Exchange;
import com.example.backend.repo.ExchangeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Intercambios", description = "Operaciones para gestionar intercambios entre estudiantes")
@RestController
@RequestMapping("/exchanges")
public class ExchangeController {

    @Autowired
    private ExchangeRepository exchangeRepository;

    @Operation(summary = "Registrar un nuevo intercambio")
    @PostMapping
    public void createExchange(@RequestBody Exchange exchange) {
        if (exchange.getStudent1() == null || exchange.getStudent1().getStudentCode() == null) {
            throw new IllegalArgumentException("Debe especificar el estudiante 1");
        }

        String studentCode = exchange.getStudent1().getStudentCode();
        long count = exchangeRepository.countByStudent1_StudentCode(studentCode);
        String newCode = studentCode + "-" + String.format("%03d", count + 1);
        exchange.setExchangeCode(newCode);

        exchangeRepository.save(exchange);
    }

    @Operation(summary = "Obtener todos los intercambios")
    @GetMapping
    public List<Exchange> getAllExchanges() {
        return exchangeRepository.findAll();
    }

    @Operation(summary = "Obtener intercambio por código")
    @GetMapping("/{code}")
    public Exchange getExchangeByCode(
            @Parameter(description = "Código del intercambio") @PathVariable String code) {
        return exchangeRepository.findById(code).orElse(null);
    }
    

    @Operation(summary = "Obtener intercambios por código de estudiante")
    @GetMapping("/student/{studentCode}")
    public List<Exchange> getExchangesByStudent(
            @Parameter(description = "Código del estudiante") @PathVariable String studentCode) {
        List<Exchange> asStudent1 = exchangeRepository.findByStudent1_StudentCode(studentCode);
        List<Exchange> asStudent2 = exchangeRepository.findByStudent2_StudentCode(studentCode);
        asStudent1.addAll(asStudent2);
        return asStudent1;
    }

    @Operation(summary = "Eliminar un intercambio por código")
    @DeleteMapping("/{id}")
    public void deleteExchange(@PathVariable String id) {
        exchangeRepository.deleteById(id);
    }
}
