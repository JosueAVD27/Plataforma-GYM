package com.persona.appfit.services;

import com.persona.appfit.interfaces.IRutina;
import com.persona.appfit.models.Rutina;
import com.persona.appfit.models.Servicio;
import com.persona.appfit.repository.RRutina;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SRutina implements IRutina {

    @Autowired
    private RRutina repositorio;

    @Override
    public List<Rutina> listar() {
        return repositorio.findAll();
    }

    @Override
    public Rutina listarId(int id) {
        return repositorio.findById(id);
    }

    @Override
    public Rutina add(Rutina r) {
        return repositorio.save(r);
    }

    @Override
    public Rutina edit(Rutina r) {
        return repositorio.save(r);
    }

    @Override
    public Rutina delete(int id) {
        Rutina r = repositorio.findById(id);
        if (r != null){
            repositorio.delete(r);
        }
        return r;
    }
}
