package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "confirmation_documents")
@Data
public class ConfirmationDocument {
    @Id
    private String documentCode;

    private String filename;

    private String filePath; // <---- NUEVO CAMPO: aquí irá la ruta donde se guarda el archivo en el servidor

    @OneToOne
    @JoinColumn(name = "studentConfirmationCode", unique = true)
    private StudentConfirmation studentConfirmation;

    // Opcional: Genera un código si no lo mandas desde el controlador.
    @PrePersist
    public void generateDocumentCode() {
        if (documentCode == null || documentCode.isEmpty()) {
            this.documentCode = "DOC-" + (studentConfirmation != null ? studentConfirmation.getStudentConfirmationCode() : System.currentTimeMillis());
        }
    }
}
