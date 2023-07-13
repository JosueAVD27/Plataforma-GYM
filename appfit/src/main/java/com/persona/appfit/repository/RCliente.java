package com.persona.appfit.repository;

import com.persona.appfit.models.Cliente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RCliente extends CrudRepository<Cliente, Integer> {
    List<Cliente>findAll();
    Cliente findById(int id);
    Cliente save(Cliente c);
    void delete(Cliente c);
}
