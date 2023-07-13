import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../Modelo/Cliente';
import { Servicio } from '../Modelo/Servicio';
import { Rutina } from '../Modelo/Rutina';
import { Suplemento } from '../Modelo/Suplemento';
import { Cotizacion } from '../Modelo/Cotizacion';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url = 'http://localhost:8080';

  Url_Clientes = this.Url + '/clientes';

  getClientes(){
    return this.http.get<Cliente[]>(this.Url_Clientes);
  }
  createCliente(cliente:Cliente){
    return this.http.post<Cliente>(this.Url_Clientes, cliente);
  }
  getClienteId(id:number){
    return this.http.get<Cliente>(this.Url_Clientes + "/" + id);
  }
  updateCliente(cliente:Cliente){
    return this.http.put<Cliente>(this.Url_Clientes + "/" + cliente.id, cliente);
  }
  deleteCliente(cliente:Cliente){
    return this.http.delete<Cliente>(this.Url_Clientes + "/" + cliente.id);
  }


  Url_Servicios = this.Url + '/servicios';

  getServicios(){
    return this.http.get<Servicio[]>(this.Url_Servicios);
  }
  createServicio(servicio:Servicio){
    return this.http.post<Servicio>(this.Url_Servicios, servicio);
  }
  getServicioId(id:number){
    return this.http.get<Servicio>(this.Url_Servicios + "/" + id);
  }
  updateServicio(servicio:Servicio){
    return this.http.put<Servicio>(this.Url_Servicios + "/" + servicio.id, servicio);
  }
  deleteServicio(servicio:Servicio){
    return this.http.delete<Servicio>(this.Url_Servicios + "/" + servicio.id);
  }


  Url_Rutinas = this.Url + '/rutinas';

  getRutinas(){
    return this.http.get<Rutina[]>(this.Url_Rutinas);
  }
  createRutina(rutina:Rutina){
    return this.http.post<Rutina>(this.Url_Rutinas, rutina);
  }
  getRutinaId(id:number){
    return this.http.get<Rutina>(this.Url_Rutinas + "/" + id);
  }
  updateRutina(rutina:Rutina){
    return this.http.put<Rutina>(this.Url_Rutinas + "/" + rutina.id, rutina);
  }
  deleteRutina(rutina:Rutina){
    return this.http.delete<Rutina>(this.Url_Rutinas + "/" + rutina.id);
  }


  Url_Suplementos = this.Url + '/suplementos';

  getSuplementos(){
    return this.http.get<Suplemento[]>(this.Url_Suplementos);
  }
  createSuplemento(suplemento:Suplemento){
    return this.http.post<Suplemento>(this.Url_Suplementos, suplemento);
  }
  getSuplementoId(id:number){
    return this.http.get<Suplemento>(this.Url_Suplementos + "/" + id);
  }
  updateSuplemento(suplemento:Suplemento){
    return this.http.put<Suplemento>(this.Url_Suplementos + "/" + suplemento.id, suplemento);
  }
  deleteSuplemento(suplemento:Suplemento){
    return this.http.delete<Suplemento>(this.Url_Suplementos + "/" + suplemento.id);
  }


  Url_Cotizaciones = this.Url + '/cotizaciones';

  getCotizaciones(){
    return this.http.get<Cotizacion[]>(this.Url_Cotizaciones);
  }
  createCotizacion(cotizacion:Cotizacion){
    return this.http.post<Cotizacion>(this.Url_Cotizaciones, cotizacion);
  }
  getCotizacionId(id:number){
    return this.http.get<Cotizacion>(this.Url_Cotizaciones + "/" + id);
  }
  updateCotizacion(cotizacion:Cotizacion){
    return this.http.put<Cotizacion>(this.Url_Cotizaciones + "/" + cotizacion.id, cotizacion);
  }
  deleteCotizacion(cotizacion:Cotizacion){
    return this.http.delete<Cotizacion>(this.Url_Cotizaciones + "/" + cotizacion.id);
  }
}
