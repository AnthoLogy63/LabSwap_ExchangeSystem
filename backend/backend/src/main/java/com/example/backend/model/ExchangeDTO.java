package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExchangeDTO {
    private String exchangeCode;
    private String offeredCourse;
    private String desiredCourse;
    private String student1Name;
    private String student1Email;
    private String student2Name;
    private String student2Email;

    public static ExchangeDTO from(Exchange e) {
        return new ExchangeDTO(
            e.getExchangeCode(),
            e.getOfferedCourseGroup().getCourse().getCourseName(),
            e.getDesiredCourseGroup().getCourse().getCourseName(),
            e.getStudent1().getStudentName(),
            e.getStudent1().getStudentEmail(),
            e.getStudent2().getStudentName(),
            e.getStudent2().getStudentEmail()
        );
    }
}
