package com.persona.appfit.interfaces;

import com.persona.appfit.models.Rutina;

import java.util.List;

public interface IRutina {
    public List<Rutina> listar();
    Rutina listarId(int id);
    Rutina add(Rutina r);
    Rutina edit(Rutina r);
    Rutina delete(int id);
}
