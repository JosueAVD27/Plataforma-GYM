package com.persona.appfit.services;

import com.persona.appfit.interfaces.ICotizacion;
import com.persona.appfit.models.Cotizacion;
import com.persona.appfit.repository.RCotizacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SCotizacion implements ICotizacion {

    @Autowired
    private RCotizacion repositorio;

    @Override
    public List<Cotizacion> listar() {
        return repositorio.findAll();
    }

    @Override
    public Cotizacion listarId(int id) {
        return repositorio.findById(id);
    }

    @Override
    public Cotizacion add(Cotizacion co) {
        return repositorio.save(co);
    }

    @Override
    public Cotizacion edit(Cotizacion co) {
        return repositorio.save(co);
    }

    @Override
    public Cotizacion delete(int id) {
        Cotizacion co = repositorio.findById(id);
        if (co != null){
            repositorio.delete(co);
        }
        return co;
    }
}
