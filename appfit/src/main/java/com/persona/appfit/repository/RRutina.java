package com.persona.appfit.repository;

import com.persona.appfit.models.Rutina;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RRutina extends CrudRepository<Rutina, Integer> {
    List<Rutina> findAll();
    Rutina findById(int id);
    Rutina save(Rutina r);
    void delete(Rutina r);
}
