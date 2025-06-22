package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "admin_confirmations")
@Data
public class AdminConfirmation {

    @Id
    private String adminConfirmationCode;

    private int confirmationStatus; // 0 = pendiente, 1 = confirmado, 2 = rechazado

    private String confirmationDate;
}
