package com.persona.appfit.services;

import com.persona.appfit.interfaces.IServicio;
import com.persona.appfit.models.Servicio;
import com.persona.appfit.repository.RServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SServicio implements IServicio {

    @Autowired
    private RServicio repositorio;

    @Override
    public List<Servicio> listar() {
        return repositorio.findAll();
    }

    @Override
    public Servicio listarId(int id) {
        return repositorio.findById(id);
    }

    @Override
    public Servicio add(Servicio s) {
        return repositorio.save(s);
    }

    @Override
    public Servicio edit(Servicio s) {
        return repositorio.save(s);
    }

    @Override
    public Servicio delete(int id) {
        Servicio s = repositorio.findById(id);
        if (s != null){
            repositorio.delete(s);
        }
        return s;
    }
}
