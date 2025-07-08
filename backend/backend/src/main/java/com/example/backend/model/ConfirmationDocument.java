package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

import java.io.File;

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
    @JsonBackReference
    private StudentConfirmation studentConfirmation;


    // Opcional: Genera un código si no lo mandas desde el controlador.
    @PrePersist
    public void generateDocumentCode() {
        if (documentCode == null || documentCode.isEmpty()) {
            this.documentCode = "DOC-" + (studentConfirmation != null ? studentConfirmation.getStudentConfirmationCode() : System.currentTimeMillis());
        }
    }

    @PreRemove
    public void deleteFile() {
        if (filePath != null) {
            File file = new File(filePath);
            if (file.exists()) {
                boolean deleted = file.delete();
                if (!deleted) {
                    System.err.println("No se pudo eliminar el archivo: " + filePath);
                } else {
                    System.out.println("Archivo eliminado: " + filePath);
                }
            }
        }
    }
}
