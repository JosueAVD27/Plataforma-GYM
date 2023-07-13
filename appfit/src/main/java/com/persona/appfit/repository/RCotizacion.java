package com.persona.appfit.repository;

import com.persona.appfit.models.Cotizacion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RCotizacion extends CrudRepository<Cotizacion, Integer> {
    List<Cotizacion> findAll();
    Cotizacion findById(int id);
    Cotizacion save(Cotizacion co);
    void delete(Cotizacion co);
}
