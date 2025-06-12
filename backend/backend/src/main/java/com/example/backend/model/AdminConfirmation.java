package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "admin_confirmations")
@Data
public class AdminConfirmation {

    @Id
    private String adminConfirmationCode;
    private int confirmationStatus; 
    private String confirmationDate;

    @ManyToOne
    @JoinColumn(name = "exchangeCode")
    private Exchange exchange;

    @PrePersist
    public void generateAdminConfirmationCode() {
        if (adminConfirmationCode == null || adminConfirmationCode.isEmpty()) {
            String prefix = "ADM";
            long timestamp = System.currentTimeMillis() % 1000000;
            this.adminConfirmationCode = prefix + String.format("%06d", timestamp);
        }
    }

}
