package com.persona.appfit.controllers;

import com.persona.appfit.interfaces.IRutina;
import com.persona.appfit.models.Rutina;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/rutinas" })
public class RutinaController {

    @Autowired
    IRutina service;

    @GetMapping
    public List<Rutina> listar(){
        List<Rutina> rutinas = service.listar();
        return rutinas;
    }

    @PostMapping
    public Rutina agregar(@RequestBody Rutina r){
        return service.add(r);
    }

    @GetMapping(path = {"/{id}"})
    public Rutina listarId(@PathVariable("id") int id){
        return service.listarId(id);
    }

    @PutMapping(path = {"/{id}"})
    public Rutina editar(@RequestBody Rutina r, @PathVariable("id") int id){
        r.setId(id);
        return service.edit(r);
    }

    @DeleteMapping(path = {"/{id}"})
    public Rutina delete(@PathVariable("id") int id){
        return service.delete(id);
    }
}
