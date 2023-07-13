import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { Suplemento } from 'src/app/Modelo/Suplemento';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-suplemento',
  templateUrl: './listar-suplemento.component.html',
  styleUrls: ['./listar-suplemento.component.css']
})
export class ListarSuplementoComponent  implements OnInit {
  suplementos: Suplemento[];
  suplementosFiltrados: Suplemento[];
  suplementosPaginados: Suplemento[];
  paginaActual: number;
  registrosPorPagina: number = 5;
  filtro: string = '';
  inicioConteo: number = 0;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.paginaActual = 1;

    forkJoin([
      this.service.getSuplementos(),
      this.service.getSuplementos().pipe(
        tap(data => {
          this.suplementos = data;
          this.filtrarSuplementos();
          this.actualizarSuplementosPaginados();
        })
      )
    ]).subscribe();
  }


  editar(suplementos: Suplemento): void {
    localStorage.setItem("id", suplementos.id.toString());
    this.router.navigate(["suplemento/edit"]);
  }

  delete(suplemento: Suplemento) {
    if (suplemento && suplemento.id) {
      // Realizar la eliminación del servicio
      this.service.deleteSuplemento(suplemento)
        .subscribe(
          () => {
            // Actualizar la lista de servicios
            this.suplementos = this.suplementos.filter(s => s !== suplemento);
            this.filtrarSuplementos();
            this.actualizarSuplementosPaginados();
            alert("Suplemento eliminado");
          },
          (error) => {
            console.error("Error al eliminar el suplemento:", error);
            alert("Ocurrió un error al eliminar el suplemento. Por favor, intenta nuevamente.");
          }
        );
    } else {
      console.error("El servicio es inválido o no tiene un ID válido");
    }
  }

  actualizarTabla() {
    this.service.getSuplementos()
      .subscribe(data => {
        this.suplementos = data;
        this.filtrarSuplementos();
      });
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarSuplementosPaginados();
    }
  }

  paginaSiguiente() {
    const ultimaPagina = Math.ceil(this.suplementosFiltrados.length / this.registrosPorPagina);
    if (this.paginaActual < ultimaPagina) {
      this.paginaActual++;
      this.actualizarSuplementosPaginados();
    }
  }

  filtrarSuplementos() {
    this.suplementosFiltrados = this.suplementos.filter(suplemento =>
      suplemento.nombre_suplemento.toLowerCase().includes(this.filtro.toLowerCase()) ||
      suplemento.marca_suplemento.toLowerCase().includes(this.filtro.toLowerCase()) ||
      suplemento.categoria_suplemento.toLowerCase().includes(this.filtro.toLowerCase()) ||
      suplemento.presentacion_suplemento.toLowerCase().includes(this.filtro.toLowerCase()) ||
      suplemento.precio_suplemento.toString().toLowerCase().includes(this.filtro.toLowerCase()) ||
      suplemento.disponibilidad_suplemento.toLowerCase().includes(this.filtro.toLowerCase())
    );
    this.paginaActual = 1; // Reiniciar la página actual al filtrar
    this.actualizarSuplementosPaginados();

    console.log(this.suplementosFiltrados);
  }

  actualizarSuplementosPaginados() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.suplementosPaginados = this.suplementosFiltrados.slice(inicio, fin);
    this.inicioConteo = inicio; // Actualizar el inicio del conteo
  }
}
