package com.persona.appfit.interfaces;

import com.persona.appfit.models.Cliente;

import java.util.List;

public interface ICliente {
    public List<Cliente> listar();

    Cliente listarId(int id);

    Cliente add(Cliente c);

    Cliente edit(Cliente c);

    Cliente delete(int id);
}
