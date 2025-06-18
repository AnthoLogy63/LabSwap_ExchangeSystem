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

        if (exchange.getOfferedCourseGroup() == null || exchange.getDesiredCourseGroup() == null) {
            throw new IllegalArgumentException("Debe especificar tanto el curso/grupo ofrecido como el deseado");
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

    @Operation(summary = "Actualizar estudiante 2 de un intercambio")
    @PutMapping("/{exchangeCode}/student2")
    public Exchange updateStudent2(
            @Parameter(description = "Código del intercambio") @PathVariable String exchangeCode,
            @RequestBody Exchange updatedExchange) {

        return exchangeRepository.findById(exchangeCode).map(exchange -> {
            exchange.setStudent2(updatedExchange.getStudent2());
            return exchangeRepository.save(exchange);
        }).orElseThrow(() -> new IllegalArgumentException("Intercambio no encontrado con código: " + exchangeCode));
    }

    @Operation(summary = "Confirmar estudiante 1 en un intercambio")
    @PutMapping("/{exchangeCode}/studentConfirmation1")
    public Exchange updateStudentConfirmation1(
            @Parameter(description = "Código del intercambio") @PathVariable String exchangeCode,
            @RequestBody Exchange updatedExchange) {

        return exchangeRepository.findById(exchangeCode).map(exchange -> {
            exchange.setStudentConfirmation1(updatedExchange.getStudentConfirmation1());
            return exchangeRepository.save(exchange);
        }).orElseThrow(() -> new IllegalArgumentException("Intercambio no encontrado con código: " + exchangeCode));
    }

    @Operation(summary = "Confirmar estudiante 2 en un intercambio")
    @PutMapping("/{exchangeCode}/studentConfirmation2")
    public Exchange updateStudentConfirmation2(
            @Parameter(description = "Código del intercambio") @PathVariable String exchangeCode,
            @RequestBody Exchange updatedExchange) {

        return exchangeRepository.findById(exchangeCode).map(exchange -> {
            exchange.setStudentConfirmation2(updatedExchange.getStudentConfirmation2());
            return exchangeRepository.save(exchange);
        }).orElseThrow(() -> new IllegalArgumentException("Intercambio no encontrado con código: " + exchangeCode));
    }

    @Operation(summary = "Confirmación del administrador en un intercambio")
    @PutMapping("/{exchangeCode}/adminConfirmation")
    public Exchange updateAdminConfirmation(
            @Parameter(description = "Código del intercambio") @PathVariable String exchangeCode,
            @RequestBody Exchange updatedExchange) {

        return exchangeRepository.findById(exchangeCode).map(exchange -> {
            exchange.setAdminConfirmation(updatedExchange.getAdminConfirmation());
            return exchangeRepository.save(exchange);
        }).orElseThrow(() -> new IllegalArgumentException("Intercambio no encontrado con código: " + exchangeCode));
    }
}
