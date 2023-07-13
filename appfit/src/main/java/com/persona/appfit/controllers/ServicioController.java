package com.persona.appfit.controllers;

import com.persona.appfit.interfaces.IServicio;
import com.persona.appfit.models.Servicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/servicios" })
public class ServicioController {

    @Autowired
    IServicio service;

    @GetMapping
    public List<Servicio> listar(){
        List<Servicio> servicios = service.listar();
        return servicios;
    }

    @PostMapping
    public Servicio agregar(@RequestBody Servicio s){
        return service.add(s);
    }

    @GetMapping(path = {"/{id}"})
    public Servicio listarId(@PathVariable("id") int id){
        return service.listarId(id);
    }

    @PutMapping(path = {"/{id}"})
    public Servicio editar(@RequestBody Servicio s, @PathVariable("id") int id){
        s.setId(id);
        return service.edit(s);
    }

    @DeleteMapping(path = {"/{id}"})
    public Servicio delete(@PathVariable("id") int id){
        return service.delete(id);
    }
}
