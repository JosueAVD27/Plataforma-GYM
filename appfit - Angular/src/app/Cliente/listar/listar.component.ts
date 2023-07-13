import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { Cliente } from 'src/app/Modelo/Cliente';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  clientes: Cliente[];
  clientesFiltrados: Cliente[];
  clientesPaginados: Cliente[];
  paginaActual: number;
  registrosPorPagina: number = 5;
  filtro: string = '';
  inicioConteo: number = 0;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.paginaActual = 1;

    forkJoin([
      this.service.getClientes(),
      this.service.getClientes().pipe(
        tap(data => {
          this.clientes = data;
          this.filtrarClientes();
          this.actualizarClientesPaginados();
        })
      )
    ]).subscribe();
  }

  cotizacion(cliente: Cliente): void {
    localStorage.setItem("id", cliente.id.toString());
    this.router.navigate(["cliente/cotizacion"]);
  }

  editar(cliente: Cliente): void {
    localStorage.setItem("id", cliente.id.toString());
    this.router.navigate(["cliente/edit"]);
  }

  delete(cliente: Cliente) {
    this.service.deleteCliente(cliente)
      .subscribe(data => {
        this.clientes = this.clientes.filter(c => c !== cliente);
        this.filtrarClientes();
        this.actualizarClientesPaginados();
        alert("Usuario eliminado");
      });
  }

  actualizarTabla() {
    this.service.getClientes()
      .subscribe(data => {
        this.clientes = data;
        this.filtrarClientes();
      });
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarClientesPaginados();
    }
  }

  paginaSiguiente() {
    const ultimaPagina = Math.ceil(this.clientesFiltrados.length / this.registrosPorPagina);
    if (this.paginaActual < ultimaPagina) {
      this.paginaActual++;
      this.actualizarClientesPaginados();
    }
  }

  filtrarClientes() {
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(this.filtro.toLowerCase()) ||
      cliente.cedula.toLowerCase().includes(this.filtro.toLowerCase()) ||
      cliente.telefono.toLowerCase().includes(this.filtro.toLowerCase()) ||
      cliente.direccion.toLowerCase().includes(this.filtro.toLowerCase())
    );
    this.paginaActual = 1; // Reiniciar la página actual al filtrar
    this.actualizarClientesPaginados();

    console.log(this.clientesFiltrados);
  }

  actualizarClientesPaginados() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.clientesPaginados = this.clientesFiltrados.slice(inicio, fin);
    this.inicioConteo = inicio; // Actualizar el inicio del conteo
  }

  calcularEdad(fechaNacimiento: string): number {
    const fechaActual = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    if (fechaActual.getMonth() < fechaNac.getMonth()) {
      edad--;
    }
    else if (fechaActual.getMonth() === fechaNac.getMonth() && fechaActual.getDate() < fechaNac.getDate()) {
      edad--;
    }

    return edad;
  }
}
