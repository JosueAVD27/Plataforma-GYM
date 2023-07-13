package com.persona.appfit.controllers;

import com.persona.appfit.interfaces.ISuplemento;
import com.persona.appfit.models.Suplemento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/suplementos" })
public class SuplementoController {

    @Autowired
    ISuplemento service;

    @GetMapping
    public List<Suplemento> listar(){
        List<Suplemento> suplementos = service.listar();
        return suplementos;
    }

    @PostMapping
    public Suplemento agregar(@RequestBody Suplemento su){
        return service.add(su);
    }

    @GetMapping(path = {"/{id}"})
    public Suplemento listarId(@PathVariable("id") int id){
        return service.listarId(id);
    }

    @PutMapping(path = {"/{id}"})
    public Suplemento editar(@RequestBody Suplemento su, @PathVariable("id") int id){
        su.setId(id);
        return service.edit(su);
    }

    @DeleteMapping(path = {"/{id}"})
    public Suplemento delete(@PathVariable("id") int id){
        return service.delete(id);
    }

}
