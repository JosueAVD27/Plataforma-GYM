package com.persona.appfit.interfaces;

import com.persona.appfit.models.Cotizacion;

import java.util.List;

public interface ICotizacion {
    public List<Cotizacion> listar();
    Cotizacion listarId(int id);
    Cotizacion add(Cotizacion co);
    Cotizacion edit(Cotizacion co);
    Cotizacion delete(int id);
}
