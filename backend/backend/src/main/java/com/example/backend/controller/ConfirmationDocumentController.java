package com.example.backend.controller;

import com.example.backend.model.ConfirmationDocument;
import com.example.backend.model.StudentConfirmation;
import com.example.backend.repo.ConfirmationDocumentRepository;
import com.example.backend.repo.StudentConfirmationRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Documento de Confirmación", description = "Gestión de documentos por confirmación de estudiante")
@RestController
@RequestMapping("/confirmation-documents")
public class ConfirmationDocumentController {

    @Autowired
    private ConfirmationDocumentRepository confirmationDocumentRepository;

    @Autowired
    private StudentConfirmationRepository studentConfirmationRepository;

    @Operation(summary = "Subir documento único para una confirmación")
    @PostMapping("/{confirmationCode}")
    public void uploadDocument(@PathVariable String confirmationCode) {
        StudentConfirmation confirmation = studentConfirmationRepository.findById(confirmationCode).orElse(null);
        if (confirmation != null) {
            ConfirmationDocument document = new ConfirmationDocument();
            document.setDocumentCode("DOC-" + confirmationCode);
            document.setFilename("Conf-" + confirmationCode + ".pdf");
            document.setStudentConfirmation(confirmation);
            confirmationDocumentRepository.save(document);
        }
    }

    @Operation(summary = "Obtener documento por código de confirmación")
    @GetMapping("/by-confirmation/{confirmationCode}")
    public ConfirmationDocument getByConfirmation(
            @Parameter(description = "Código de confirmación del estudiante") @PathVariable String confirmationCode) {
        return confirmationDocumentRepository.findByStudentConfirmation_StudentConfirmationCode(confirmationCode);
    }
}
