package com.persona.appfit.repository;

import com.persona.appfit.models.Suplemento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RSuplemento extends CrudRepository<Suplemento, Integer> {
    List<Suplemento> findAll();
    Suplemento findById(int id);
    Suplemento save(Suplemento su);
    void delete(Suplemento su);
}
