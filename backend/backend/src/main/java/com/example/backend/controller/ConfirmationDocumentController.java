package com.example.backend.controller;

import com.example.backend.model.ConfirmationDocument;
import com.example.backend.model.StudentConfirmation;
import com.example.backend.repo.ConfirmationDocumentRepository;
import com.example.backend.repo.StudentConfirmationRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;

@Tag(name = "Documento de Confirmación", description = "Gestión de documentos por confirmación de estudiante")
@RestController
@RequestMapping("/confirmation-documents")
public class ConfirmationDocumentController {

    @Autowired
    private ConfirmationDocumentRepository confirmationDocumentRepository;

    @Autowired
    private StudentConfirmationRepository studentConfirmationRepository;

    // Al inicio del controlador
    private static final String UPLOAD_FOLDER = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "DNIS";


    @Operation(summary = "Subir documento único para una confirmación")
    @PostMapping("/{confirmationCode}")
    public ResponseEntity<?> uploadDocument(
            @PathVariable String confirmationCode,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        // 1. Busca la confirmación
        StudentConfirmation confirmation = studentConfirmationRepository.findById(confirmationCode)
                .orElseThrow(() -> new IllegalArgumentException("Confirmación no encontrada"));

        // 2. Asegura que la carpeta existe
        Path uploadDir = Paths.get(UPLOAD_FOLDER);
        Files.createDirectories(uploadDir);

        // 3. Genera nombre único y extensión
        String originalName = file.getOriginalFilename();
        String extension = (originalName != null && originalName.contains("."))
                ? originalName.substring(originalName.lastIndexOf("."))
                : ".pdf";
        String fileName = "DNI-" + confirmationCode + extension;

        // 4. Guarda el archivo
        Path filePath = uploadDir.resolve(fileName);
        file.transferTo(filePath.toFile());

        // 5. Guarda el registro en la BD
        ConfirmationDocument document = new ConfirmationDocument();
        document.setDocumentCode("DOC-" + confirmationCode);
        document.setFilename(fileName);
        document.setFilePath(Paths.get(UPLOAD_FOLDER, fileName).toString()); // Ruta relativa
        document.setStudentConfirmation(confirmation);
        confirmationDocumentRepository.save(document);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Obtener documento por código de confirmación")
    @GetMapping("/by-confirmation/{confirmationCode}")
    public ConfirmationDocument getByConfirmation(
            @Parameter(description = "Código de confirmación del estudiante") @PathVariable String confirmationCode) {
        return confirmationDocumentRepository.findByStudentConfirmation_StudentConfirmationCode(confirmationCode);
    }
}
