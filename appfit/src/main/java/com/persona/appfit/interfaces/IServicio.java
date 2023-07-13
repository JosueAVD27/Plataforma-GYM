package com.persona.appfit.interfaces;

import com.persona.appfit.models.Servicio;

import java.util.List;

public interface IServicio {
    public List<Servicio> listar();
    Servicio listarId(int id);
    Servicio add(Servicio s);
    Servicio edit(Servicio s);
    Servicio delete(int id);
}
