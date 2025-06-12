package com.example.backend.repo;

import com.example.backend.model.Exchange;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeRepository extends JpaRepository<Exchange, String> {

    List<Exchange> findByStudent1_StudentCode(String studentCode);

    List<Exchange> findByStudent2_StudentCode(String studentCode);

    long countByStudent1_StudentCode(String studentCode);
}
