package com.persona.appfit.services;

import com.persona.appfit.interfaces.ISuplemento;
import com.persona.appfit.models.Suplemento;
import com.persona.appfit.repository.RSuplemento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SSuplemento implements ISuplemento {

    @Autowired
    private RSuplemento repositorio;

    @Override
    public List<Suplemento> listar() {
        return repositorio.findAll();
    }

    @Override
    public Suplemento listarId(int id) {
        return repositorio.findById(id);
    }

    @Override
    public Suplemento add(Suplemento su) {
        return repositorio.save(su);
    }

    @Override
    public Suplemento edit(Suplemento su) {
        return repositorio.save(su);
    }

    @Override
    public Suplemento delete(int id) {
        Suplemento su = repositorio.findById(id);
        if (su != null){
            repositorio.delete(su);
        }
        return su;
    }
}
