package com.persona.appfit.controllers;

import com.persona.appfit.interfaces.ICotizacion;
import com.persona.appfit.models.Cotizacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/cotizaciones" })
public class CotizacionController {
    @Autowired
    ICotizacion service;

    @GetMapping
    public List<Cotizacion> listar(){
        List<Cotizacion> cotizaciones = service.listar();
        return cotizaciones;
    }

    @PostMapping
    public Cotizacion agregar(@RequestBody Cotizacion co){
        return service.add(co);
    }

    @GetMapping(path = {"/{id}"})
    public Cotizacion listarId(@PathVariable("id") int id){
        return service.listarId(id);
    }

    @PutMapping(path = {"/{id}"})
    public Cotizacion editar(@RequestBody Cotizacion co, @PathVariable("id") int id){
        co.setId(id);
        return service.edit(co);
    }

    @DeleteMapping(path = {"/{id}"})
    public Cotizacion delete(@PathVariable("id") int id){
        return service.delete(id);
    }

}
