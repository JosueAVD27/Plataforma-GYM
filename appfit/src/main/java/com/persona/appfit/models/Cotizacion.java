package com.persona.appfit.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cotizacion")
public class Cotizacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_cliente;
    private int id_rutina;
    private int id_servicio;
    private int id_suplemento;
    private Double monto_cotizacion;
    private String estado_cotizacion;
    private String observacion_cotizacion;

    @ManyToOne
    @JoinColumn(name = "servicio_id")
    private Servicio servicio;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    public Cotizacion(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(int id_cliente) {
        this.id_cliente = id_cliente;
    }

    public int getId_rutina() {
        return id_rutina;
    }

    public void setId_rutina(int id_rutina) {
        this.id_rutina = id_rutina;
    }

    public int getId_servicio() {
        return id_servicio;
    }

    public void setId_servicio(int id_servicio) {
        this.id_servicio = id_servicio;
    }

    public int getId_suplemento() {
        return id_suplemento;
    }

    public void setId_suplemento(int id_suplemento) {
        this.id_suplemento = id_suplemento;
    }

    public Double getMonto_cotizacion() {
        return monto_cotizacion;
    }

    public void setMonto_cotizacion(Double monto_cotizacion) {
        this.monto_cotizacion = monto_cotizacion;
    }

    public String getEstado_cotizacion() {
        return estado_cotizacion;
    }

    public void setEstado_cotizacion(String estado_cotizacion) {
        this.estado_cotizacion = estado_cotizacion;
    }

    public String getObservacion_cotizacion() {
        return observacion_cotizacion;
    }

    public void setObservacion_cotizacion(String observacion_cotizacion) {
        this.observacion_cotizacion = observacion_cotizacion;
    }
}
