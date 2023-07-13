import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { Servicio } from 'src/app/Modelo/Servicio';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-servicio',
  templateUrl: './listar-servicio.component.html',
  styleUrls: ['./listar-servicio.component.css']
})
export class ListarServicioComponent implements OnInit {

  servicios: Servicio[];
  serviciosFiltrados: Servicio[];
  serviciosPaginados: Servicio[];
  paginaActual: number;
  registrosPorPagina: number = 5;
  filtro: string = '';
  inicioConteo: number = 0;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.paginaActual = 1;

    forkJoin([
      this.service.getServicios(),
      this.service.getServicios().pipe(
        tap(data => {
          this.servicios = data;
          this.filtrarServicios();
          this.actualizarServiciosPaginados();
        })
      )
    ]).subscribe();
  }


  editar(servicio: Servicio): void {
    localStorage.setItem("id", servicio.id.toString());
    this.router.navigate(["servicio/edit"]);
  }

  delete(servicio: Servicio) {
    if (servicio && servicio.id) {
      // Realizar la eliminación del servicio
      this.service.deleteServicio(servicio)
        .subscribe(
          () => {
            // Actualizar la lista de servicios
            this.servicios = this.servicios.filter(s => s !== servicio);
            this.filtrarServicios();
            this.actualizarServiciosPaginados();
            alert("Servicio eliminado");
          },
          (error) => {
            console.error("Error al eliminar el servicio:", error);
            alert("Ocurrió un error al eliminar el servicio. Por favor, intenta nuevamente.");
          }
        );
    } else {
      console.error("El servicio es inválido o no tiene un ID válido");
    }
  }

  actualizarTabla() {
    this.service.getServicios()
      .subscribe(data => {
        this.servicios = data;
        this.filtrarServicios();
      });
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarServiciosPaginados();
    }
  }

  paginaSiguiente() {
    const ultimaPagina = Math.ceil(this.serviciosFiltrados.length / this.registrosPorPagina);
    if (this.paginaActual < ultimaPagina) {
      this.paginaActual++;
      this.actualizarServiciosPaginados();
    }
  }

  filtrarServicios() {
    this.serviciosFiltrados = this.servicios.filter(servicio =>
      servicio.nombre_servicio.toLowerCase().includes(this.filtro.toLowerCase()) ||
      servicio.precio_servicio?.toString().toLowerCase().includes(this.filtro.toLowerCase()) ||
      servicio.promocion_servicio.toLowerCase().includes(this.filtro.toLowerCase())
    );
    this.paginaActual = 1; // Reiniciar la página actual al filtrar
    this.actualizarServiciosPaginados();

    console.log(this.serviciosFiltrados);
  }

  actualizarServiciosPaginados() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.serviciosPaginados = this.serviciosFiltrados.slice(inicio, fin);
    this.inicioConteo = inicio; // Actualizar el inicio del conteo
  }
}
