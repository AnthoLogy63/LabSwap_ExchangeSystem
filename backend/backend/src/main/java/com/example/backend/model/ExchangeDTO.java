package com.example.backend.model;


public class ExchangeDTO {
    private String exchangeCode;
    private String offeredCourseName;
    private String desiredCourseName;
    private String offeringStudentName;
    private String offeringStudentEmail;
    private String receivingStudentName;
    private String receivingStudentEmail;

    public static ExchangeDTO from(Exchange exchange) {
        ExchangeDTO dto = new ExchangeDTO();

        dto.setExchangeCode(exchange.getExchangeCode());

        if (exchange.getOfferedCourseGroup() != null && exchange.getOfferedCourseGroup().getCourse() != null) {
            dto.setOfferedCourseName(exchange.getOfferedCourseGroup().getCourse().getCourseName());
        } else {
            dto.setOfferedCourseName("No definido");
        }

        if (exchange.getDesiredCourseGroup() != null && exchange.getDesiredCourseGroup().getCourse() != null) {
            dto.setDesiredCourseName(exchange.getDesiredCourseGroup().getCourse().getCourseName());
        } else {
            dto.setDesiredCourseName("No definido");
        }

        if (exchange.getStudent1() != null) {
            dto.setOfferingStudentName(exchange.getStudent1().getStudentName());
            dto.setOfferingStudentEmail(exchange.getStudent1().getStudentEmail());
        } else {
            dto.setOfferingStudentName("No definido");
            dto.setOfferingStudentEmail("No definido");
        }

        if (exchange.getStudent2() != null) {
            dto.setReceivingStudentName(exchange.getStudent2().getStudentName());
            dto.setReceivingStudentEmail(exchange.getStudent2().getStudentEmail());
        } else {
            dto.setReceivingStudentName("Pendiente");
            dto.setReceivingStudentEmail("Pendiente");
        }

        return dto;
    }

    // Getters y Setters
    public String getExchangeCode() {
        return exchangeCode;
    }

    public void setExchangeCode(String exchangeCode) {
        this.exchangeCode = exchangeCode;
    }

    public String getOfferedCourseName() {
        return offeredCourseName;
    }

    public void setOfferedCourseName(String offeredCourseName) {
        this.offeredCourseName = offeredCourseName;
    }

    public String getDesiredCourseName() {
        return desiredCourseName;
    }

    public void setDesiredCourseName(String desiredCourseName) {
        this.desiredCourseName = desiredCourseName;
    }

    public String getOfferingStudentName() {
        return offeringStudentName;
    }

    public void setOfferingStudentName(String offeringStudentName) {
        this.offeringStudentName = offeringStudentName;
    }

    public String getOfferingStudentEmail() {
        return offeringStudentEmail;
    }

    public void setOfferingStudentEmail(String offeringStudentEmail) {
        this.offeringStudentEmail = offeringStudentEmail;
    }

    public String getReceivingStudentName() {
        return receivingStudentName;
    }

    public void setReceivingStudentName(String receivingStudentName) {
        this.receivingStudentName = receivingStudentName;
    }

    public String getReceivingStudentEmail() {
        return receivingStudentEmail;
    }

    public void setReceivingStudentEmail(String receivingStudentEmail) {
        this.receivingStudentEmail = receivingStudentEmail;
    }
}
