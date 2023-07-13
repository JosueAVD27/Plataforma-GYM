package com.persona.appfit.interfaces;

import com.persona.appfit.models.Suplemento;

import java.util.List;

public interface ISuplemento {
    public List<Suplemento> listar();
    Suplemento listarId(int id);
    Suplemento add(Suplemento su);
    Suplemento edit(Suplemento su);
    Suplemento delete(int id);
}
