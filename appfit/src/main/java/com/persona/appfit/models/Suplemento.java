package com.persona.appfit.models;

import jakarta.persistence.*;

@Entity
@Table(name = "suplemento")
public class Suplemento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre_suplemento;
    private String descripcion_suplemento;
    private String marca_suplemento;
    private String categoria_suplemento;
    private String presentacion_suplemento;
    private String instrucciones_suplemento;
    private Double precio_suplemento;
    private String disponibilidad_suplemento;

    @ManyToMany
    @JoinTable(
            name = "cotizacion_suplemento",
            joinColumns = @JoinColumn(name = "suplemento_id"),
            inverseJoinColumns = @JoinColumn(name = "cotizacion_id")
    )
    private List<Cotizacion> cotizaciones;
    
    public Suplemento(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre_suplemento() {
        return nombre_suplemento;
    }

    public void setNombre_suplemento(String nombre_suplemento) {
        this.nombre_suplemento = nombre_suplemento;
    }

    public String getDescripcion_suplemento() {
        return descripcion_suplemento;
    }

    public void setDescripcion_suplemento(String descripcion_suplemento) {
        this.descripcion_suplemento = descripcion_suplemento;
    }

    public String getMarca_suplemento() {
        return marca_suplemento;
    }

    public void setMarca_suplemento(String marca_suplemento) {
        this.marca_suplemento = marca_suplemento;
    }

    public String getCategoria_suplemento() {
        return categoria_suplemento;
    }

    public void setCategoria_suplemento(String categoria_suplemento) {
        this.categoria_suplemento = categoria_suplemento;
    }

    public String getPresentacion_suplemento() {
        return presentacion_suplemento;
    }

    public void setPresentacion_suplemento(String presentacion_suplemento) {
        this.presentacion_suplemento = presentacion_suplemento;
    }

    public String getInstrucciones_suplemento() {
        return instrucciones_suplemento;
    }

    public void setInstrucciones_suplemento(String instrucciones_suplemento) {
        this.instrucciones_suplemento = instrucciones_suplemento;
    }

    public Double getPrecio_suplemento() {
        return precio_suplemento;
    }

    public void setPrecio_suplemento(Double precio_suplemento) {
        this.precio_suplemento = precio_suplemento;
    }

    public String getDisponibilidad_suplemento() {
        return disponibilidad_suplemento;
    }

    public void setDisponibilidad_suplemento(String disponibilidad_suplemento) {
        this.disponibilidad_suplemento = disponibilidad_suplemento;
    }
}
