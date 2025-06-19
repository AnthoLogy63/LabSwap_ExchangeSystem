package com.example.backend.controller;

import com.example.backend.model.Student;
import com.example.backend.repo.StudentRepository;
import com.example.backend.security.JwtService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JwtService jwtService;

    private static final String CLIENT_ID = "548081973466-hc4jt3cbs4fhafppl96kjfrkhvj7nvta.apps.googleusercontent.com";

    @PostMapping("/google")
    public Map<String, String> loginWithGoogle(@RequestBody Map<String, String> body) throws Exception {
        String credential = body.get("credential");
        String selectedRole = body.get("role"); // Recibe el rol desde el frontend

        if (credential == null || selectedRole == null) {
            throw new RuntimeException("Faltan datos en la solicitud");
        }

        // Verifica el token de Google
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

        GoogleIdToken idToken = verifier.verify(credential);

        if (idToken == null) {
            throw new RuntimeException("Token de Google inválido");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        // Validación general: solo correos institucionales UNSA
        if (!email.endsWith("@unsa.edu.pe")) {
            throw new RuntimeException("Solo se permiten correos institucionales");
        }

        // Validación especial: solo ciertos correos pueden ser administradores
        if ("lluquecon".equals(selectedRole) && !email.equals("lluquecon@unsa.edu.pe")) {
            throw new RuntimeException("Este correo no tiene permiso de administrador");
        }

        // Buscar si ya existe el estudiante
        Student student = studentRepository.findByStudentEmail(email).orElse(null);

        if (student == null) {
            Student nuevo = new Student();
            nuevo.setStudentEmail(email);
            nuevo.setStudentName(name);
            nuevo.setStudentPhone(""); // default temporal
            nuevo.setYearStudy(1);     // default temporal
            student = studentRepository.save(nuevo);
        } else {
            if (!student.getStudentName().equals(name)) {
                student.setStudentName(name);
                student = studentRepository.save(student);
            }
        }

        // Generar JWT con el rol asignado
        String token = jwtService.generateToken(email, name, selectedRole);

        // Devolver datos al frontend
        return Map.of(
                "token", token,
                "email", email,
                "name", name,
                "role", selectedRole
        );
    }
}
