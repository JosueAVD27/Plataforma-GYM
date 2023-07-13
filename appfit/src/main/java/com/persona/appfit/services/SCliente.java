package com.persona.appfit.services;

import com.persona.appfit.interfaces.ICliente;
import com.persona.appfit.models.Cliente;
import com.persona.appfit.repository.RCliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SCliente implements ICliente {

    @Autowired
    private RCliente repositorio;

    @Override
    public List<Cliente> listar() {
        return repositorio.findAll();
    }

    @Override
    public Cliente listarId(int id) {
        return repositorio.findById(id);
    }

    @Override
    public Cliente add(Cliente c) {
        return repositorio.save(c);
    }

    @Override
    public Cliente edit(Cliente c) {
        return repositorio.save(c);
    }

    @Override
    public Cliente delete(int id) {
        Cliente c = repositorio.findById(id);
        if (c != null){
            repositorio.delete(c);
        }
        return c;
    }
}
