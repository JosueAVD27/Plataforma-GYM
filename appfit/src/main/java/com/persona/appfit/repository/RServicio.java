package com.persona.appfit.repository;

import com.persona.appfit.models.Servicio;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RServicio extends CrudRepository<Servicio, Integer> {
    List<Servicio>findAll();
    Servicio findById(int id);
    Servicio save(Servicio s);
    void delete(Servicio s);
}
