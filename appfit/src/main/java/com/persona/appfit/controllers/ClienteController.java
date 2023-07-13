package com.persona.appfit.controllers;

import com.persona.appfit.interfaces.ICliente;
import com.persona.appfit.models.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/clientes" })
public class ClienteController {

    @Autowired
    ICliente service;

    @GetMapping
    public List<Cliente> listar(){
        List<Cliente> clientes = service.listar();
        Collections.reverse(clientes);
        return clientes;
    }

    @PostMapping
    public Cliente agregar(@RequestBody Cliente c){
        return service.add(c);
    }

    @GetMapping(path = {"/{id}"})
    public Cliente listarId(@PathVariable("id") int id){
        return service.listarId(id);
    }

    @PutMapping(path = {"/{id}"})
    public Cliente editar(@RequestBody Cliente c, @PathVariable("id") int id){
        c.setId(id);
        return service.edit(c);
    }

    @DeleteMapping(path = {"/{id}"})
    public Cliente delete(@PathVariable("id") int id){
        return service.delete(id);
    }
}
