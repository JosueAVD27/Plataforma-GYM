package com.persona.appfit.models;

import jakarta.persistence.*;

@Entity
@Table(name = "rutina")
public class Rutina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre_rutina;
    private String descripcion_rutina;
    private String duracion_rutina;
    private String dias_rutina;
    private String material_rutina;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    public Rutina(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre_rutina() {
        return nombre_rutina;
    }

    public void setNombre_rutina(String nombre_rutina) {
        this.nombre_rutina = nombre_rutina;
    }

    public String getDescripcion_rutina() {
        return descripcion_rutina;
    }

    public void setDescripcion_rutina(String descripcion_rutina) {
        this.descripcion_rutina = descripcion_rutina;
    }

    public String getDuracion_rutina() {
        return duracion_rutina;
    }

    public void setDuracion_rutina(String duracion_rutina) {
        this.duracion_rutina = duracion_rutina;
    }

    public String getDias_rutina() {
        return dias_rutina;
    }

    public void setDias_rutina(String dias_rutina) {
        this.dias_rutina = dias_rutina;
    }

    public String getMaterial_rutina() {
        return material_rutina;
    }

    public void setMaterial_rutina(String material_rutina) {
        this.material_rutina = material_rutina;
    }
}
