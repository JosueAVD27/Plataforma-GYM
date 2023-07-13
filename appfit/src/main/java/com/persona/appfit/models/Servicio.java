package com.persona.appfit.models;

import jakarta.persistence.*;

@Entity
@Table(name = "servicio")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre_servicio;
    private String descripcion_servicio;
    private Double precio_servicio;
    private String duracion_servicio;
    private String promocion_servicio;
    private String observaciones_servicio;

    public Servicio(){
    }

    public int getId() {
        return id;
    }

    public void setId(int id_servicio) {
        this.id = id_servicio;
    }

    public String getNombre_servicio() {
        return nombre_servicio;
    }

    public void setNombre_servicio(String nombre_servicio) {
        this.nombre_servicio = nombre_servicio;
    }

    public String getDescripcion_servicio() {
        return descripcion_servicio;
    }

    public void setDescripcion_servicio(String descripcion_servicio) {
        this.descripcion_servicio = descripcion_servicio;
    }

    public Double getPrecio_servicio() {
        return precio_servicio;
    }

    public void setPrecio_servicio(Double precio_servicio) {
        this.precio_servicio = precio_servicio;
    }

    public String getDuracion_servicio() {
        return duracion_servicio;
    }

    public void setDuracion_servicio(String duracion_servicio) {
        this.duracion_servicio = duracion_servicio;
    }

    public String getPromocion_servicio() {
        return promocion_servicio;
    }

    public void setPromocion_servicio(String promocion_servicio) {
        this.promocion_servicio = promocion_servicio;
    }

    public String getObservaciones_servicio() {
        return observaciones_servicio;
    }

    public void setObservaciones_servicio(String observaciones_servicio) {
        this.observaciones_servicio = observaciones_servicio;
    }
}
