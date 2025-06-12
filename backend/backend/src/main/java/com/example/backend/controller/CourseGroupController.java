package com.example.backend.controller;

import com.example.backend.model.CourseGroup;
import com.example.backend.repo.CourseGroupRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Grupos de Curso", description = "Operaciones para gestionar los grupos de cada curso")
@RestController
@RequestMapping("/course-groups")
public class CourseGroupController {

    @Autowired
    private CourseGroupRepository courseGroupRepository;

    @Operation(summary = "Crear un nuevo grupo de curso")
    @PostMapping
    public void create(@RequestBody CourseGroup courseGroup) {
        courseGroupRepository.save(courseGroup);
    }

    @Operation(summary = "Listar todos los grupos de curso")
    @GetMapping
    public List<CourseGroup> getAll() {
        return courseGroupRepository.findAll();
    }

    @Operation(summary = "Obtener los cursos por nombre de grupo (ej. A, B, C)")
    @GetMapping("/by-group/{groupName}")
    public List<CourseGroup> getByGroupName(@PathVariable String groupName) {
        return courseGroupRepository.findByGroupNameIgnoreCase(groupName);
    }

    @Operation(summary = "Obtener los grupos disponibles para un curso específico")
    @GetMapping("/groups-by-course/{courseCode}")
    public List<String> getGroupsByCourse(@PathVariable String courseCode) {
        return courseGroupRepository.findByCourse_CourseCode(courseCode)
                                    .stream()
                                    .map(CourseGroup::getGroupName)
                                    .distinct()
                                    .toList();
    }
}
