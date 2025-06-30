package com.example.backend.controller;

import com.example.backend.model.AdminConfirmation;
import com.example.backend.model.Exchange;
import com.example.backend.model.StudentConfirmation;
import com.example.backend.repo.ExchangeRepository;
import com.example.backend.repo.StudentConfirmationRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.backend.model.ExchangeDTO;


import java.util.List;
import java.util.Map;

@Tag(name = "Intercambios", description = "Operaciones para gestionar intercambios entre estudiantes")
@RestController
@RequestMapping("/exchanges")
public class ExchangeController {

    @Autowired
    private ExchangeRepository exchangeRepository;

    @Autowired
    private StudentConfirmationRepository studentConfirmationRepository;

    @Operation(summary = "Registrar un nuevo intercambio")
    @PostMapping
    public Exchange createExchange(@RequestBody Exchange exchange) {
        if (exchange.getStudent1() == null || exchange.getStudent1().getStudentCode() == null) {
            throw new IllegalArgumentException("Debe especificar el estudiante 1");
        }

        if (exchange.getOfferedCourseGroup() == null || exchange.getDesiredCourseGroup() == null) {
            throw new IllegalArgumentException("Debe especificar tanto el curso/grupo ofrecido como el deseado");
        }

        long count = exchangeRepository.count();
        String newCode = "EXC" + String.format("%06d", count + 1);
        exchange.setExchangeCode(newCode);

        // Confirmación para estudiante 1
        StudentConfirmation conf1 = new StudentConfirmation();
        conf1.setStudentConfirmationCode("SCF" + newCode + "-" + exchange.getStudent1().getStudentCode());
        conf1.setConfirmationStatus(0);
        conf1.setStudent(exchange.getStudent1());
        studentConfirmationRepository.save(conf1);
        exchange.setStudentConfirmation1(conf1);

        // Confirmación del administrador
        AdminConfirmation adminConf = new AdminConfirmation();
        adminConf.setAdminConfirmationCode("ADM" + newCode);
        adminConf.setConfirmationStatus(0); // Pendiente
        adminConf.setConfirmationDate(null); // aún sin confirmar
        exchange.setAdminConfirmation(adminConf);

        return exchangeRepository.save(exchange);
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

    @Operation(summary = "Confirmar y asignar al Estudiante 2")
    @PutMapping("/{exchangeCode}/student2")
    public Exchange addStudent2WithConfirmation(
            @Parameter(description = "Código del intercambio") @PathVariable String exchangeCode,
            @RequestBody Exchange updatedExchange) {

        return exchangeRepository.findById(exchangeCode).map(exchange -> {
            if (updatedExchange.getStudent2() == null || updatedExchange.getStudent2().getStudentCode() == null) {
                throw new IllegalArgumentException("Debe proporcionar un estudiante 2 válido");
            }

            exchange.setStudent2(updatedExchange.getStudent2());

            // Crear confirmación para estudiante 2
            StudentConfirmation conf2 = new StudentConfirmation();
            conf2.setStudentConfirmationCode("SCF" + exchangeCode + "-" + updatedExchange.getStudent2().getStudentCode());
            conf2.setConfirmationStatus(0); // Pendiente
            conf2.setStudent(updatedExchange.getStudent2());

            studentConfirmationRepository.save(conf2);
            exchange.setStudentConfirmation2(conf2);

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

    @Operation(summary = "Confirmar decision de administrador en un intercambio")
    @PutMapping("/{exchangeCode}/adminConfirmation")
    public Exchange updateAdminConfirmation(
            @Parameter(description = "Código del intercambio") @PathVariable String exchangeCode,
            @RequestBody Exchange updatedExchange) {

        return exchangeRepository.findById(exchangeCode).map(exchange -> {
            exchange.setAdminConfirmation(updatedExchange.getAdminConfirmation());
            return exchangeRepository.save(exchange);
        }).orElseThrow(() -> new IllegalArgumentException("Intercambio no encontrado con código: " + exchangeCode));
    }

    @Operation(summary = "Estado de confirmación del estudiante 1")
    @GetMapping("/{exchangeCode}/status/student1")
    public int getStudent1ConfirmationStatus(@PathVariable String exchangeCode) {
        return exchangeRepository.findById(exchangeCode)
                .map(exchange -> exchange.getStudentConfirmation1() != null
                        ? exchange.getStudentConfirmation1().getConfirmationStatus()
                        : -1)
                .orElseThrow(() -> new IllegalArgumentException("Intercambio no encontrado con código: " + exchangeCode));
    }

    @Operation(summary = "Estado de confirmación del estudiante 2")
    @GetMapping("/{exchangeCode}/status/student2")
    public int getStudent2ConfirmationStatus(@PathVariable String exchangeCode) {
        return exchangeRepository.findById(exchangeCode)
                .map(exchange -> exchange.getStudentConfirmation2() != null
                        ? exchange.getStudentConfirmation2().getConfirmationStatus()
                        : -1)
                .orElseThrow(() -> new IllegalArgumentException("Intercambio no encontrado con código: " + exchangeCode));
    }

    @Operation(summary = "Estado de confirmación del administrador")
    @GetMapping("/{exchangeCode}/status/admin")
    public int getAdminConfirmationStatus(@PathVariable String exchangeCode) {
        return exchangeRepository.findById(exchangeCode)
                .map(exchange -> exchange.getAdminConfirmation() != null
                        ? exchange.getAdminConfirmation().getConfirmationStatus()
                        : -1)
                .orElseThrow(() -> new IllegalArgumentException("Intercambio no encontrado con código: " + exchangeCode));
    }

    @Operation(summary = "Obtener todos los intercambios completamente confirmados (estudiante 1, estudiante 2 y admin)")
    @GetMapping("/fully-confirmed")
    public List<Exchange> getFullyConfirmedExchanges() {
        return exchangeRepository.findAll().stream()
                .filter(e ->
                        e.getStudentConfirmation1() != null &&
                        e.getStudentConfirmation1().getConfirmationStatus() == 1 &&
                        e.getStudentConfirmation2() != null &&
                        e.getStudentConfirmation2().getConfirmationStatus() == 1 &&
                        e.getAdminConfirmation() != null &&
                        e.getAdminConfirmation().getConfirmationStatus() == 1
                )
                .toList();
    }

    @Operation(summary = "Obtener intercambios confirmados por ambos estudiantes pero pendientes por el administrador")
    @GetMapping("/awaiting-admin")
    public List<Exchange> getExchangesAwaitingAdminConfirmation() {
        return exchangeRepository.findAll().stream()
                .filter(e ->
                    e.getStudentConfirmation1() != null &&
                    e.getStudentConfirmation1().getConfirmationStatus() == 1 &&
                    e.getStudentConfirmation2() != null &&
                    e.getStudentConfirmation2().getConfirmationStatus() == 1 &&
                    e.getAdminConfirmation() != null &&
                    e.getAdminConfirmation().getConfirmationStatus() == 0
                )
                .toList();
    }

    @Operation(summary = "Obtener intercambios pendientes para el administrador (en formato DTO)")
    @GetMapping("/pendientes")
    public List<ExchangeDTO> getPendingExchanges() {
        return exchangeRepository.findAll().stream()
                .filter(e ->
                        e.getStudentConfirmation1() != null &&
                        e.getStudentConfirmation1().getConfirmationStatus() == 1 &&
                        e.getStudentConfirmation2() != null &&
                        e.getStudentConfirmation2().getConfirmationStatus() == 1 &&
                        e.getAdminConfirmation() != null &&
                        e.getAdminConfirmation().getConfirmationStatus() == 0
                )
                .map(ExchangeDTO::from)
                .toList();
    }

    @Operation(summary = "Actualizar el estado del intercambio (aceptar o rechazar) por el administrador")
    @PutMapping("/{exchangeCode}/status")
    public Exchange updateExchangeStatus(
            @PathVariable String exchangeCode,
            @RequestBody Map<String, String> body) {

        String estado = body.get("estado"); // debe ser "ACEPTADO" o "RECHAZADO"

        return exchangeRepository.findById(exchangeCode).map(exchange -> {
            if (exchange.getAdminConfirmation() != null) {
                if (estado.equalsIgnoreCase("ACEPTADO")) {
                    exchange.getAdminConfirmation().setConfirmationStatus(1);
                } else if (estado.equalsIgnoreCase("RECHAZADO")) {
                    exchange.getAdminConfirmation().setConfirmationStatus(2);
                } else {
                    throw new IllegalArgumentException("Estado inválido: " + estado);
                }
            }
            return exchangeRepository.save(exchange);
        }).orElseThrow(() -> new IllegalArgumentException("Intercambio no encontrado con código: " + exchangeCode));
}



}
