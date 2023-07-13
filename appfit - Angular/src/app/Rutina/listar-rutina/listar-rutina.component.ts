import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { Rutina } from 'src/app/Modelo/Rutina';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-rutina',
  templateUrl: './listar-rutina.component.html',
  styleUrls: ['./listar-rutina.component.css']
})
export class ListarRutinaComponent implements OnInit {

  rutinas: Rutina[];
  rutinasFiltrados: Rutina[];
  rutinasPaginados: Rutina[];
  paginaActual: number;
  registrosPorPagina: number = 5;
  filtro: string = '';
  inicioConteo: number = 0;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.paginaActual = 1;

    forkJoin([
      this.service.getRutinas(),
      this.service.getRutinas().pipe(
        tap(data => {
          this.rutinas = data;
          this.filtrarRutinas();
          this.actualizarRutinasPaginados();
        })
      )
    ]).subscribe();
  }


  editar(rutina: Rutina): void {
    localStorage.setItem("id", rutina.id.toString());
    this.router.navigate(["rutina/edit"]);
  }

  delete(rutina: Rutina) {
    if (rutina && rutina.id) {
      // Realizar la eliminación del servicio
      this.service.deleteRutina(rutina)
        .subscribe(
          () => {
            // Actualizar la lista de servicios
            this.rutinas = this.rutinas.filter(s => s !== rutina);
            this.filtrarRutinas();
            this.actualizarRutinasPaginados();
            alert("Rutina eliminada");
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
    this.service.getRutinas()
      .subscribe(data => {
        this.rutinas = data;
        this.filtrarRutinas();
      });
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarRutinasPaginados();
    }
  }

  paginaSiguiente() {
    const ultimaPagina = Math.ceil(this.rutinasFiltrados.length / this.registrosPorPagina);
    if (this.paginaActual < ultimaPagina) {
      this.paginaActual++;
      this.actualizarRutinasPaginados();
    }
  }

  filtrarRutinas() {
    this.rutinasFiltrados = this.rutinas.filter(rutina =>
      rutina.nombre_rutina.toLowerCase().includes(this.filtro.toLowerCase())
    );
    this.paginaActual = 1; // Reiniciar la página actual al filtrar
    this.actualizarRutinasPaginados();

    console.log(this.rutinasFiltrados);
  }

  actualizarRutinasPaginados() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.rutinasPaginados = this.rutinasFiltrados.slice(inicio, fin);
    this.inicioConteo = inicio; // Actualizar el inicio del conteo
  }
}
