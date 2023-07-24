package com.persona.appfit.controllers;

import com.persona.appfit.services.SuplementoService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suplementacion")
public class DataController {
    private final SuplementoService suplementoService;

    @Autowired
    public DataController(SuplementoService suplementoService) {
        this.suplementoService = suplementoService;
    }

    @GetMapping
    public List<Document> getSuplementos() {
        return suplementoService.obtenerSuplementos();
    }
}
