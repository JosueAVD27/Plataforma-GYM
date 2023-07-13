import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Cliente } from 'src/app/Modelo/Cliente';
import { Servicio } from 'src/app/Modelo/Servicio';
import { Rutina } from 'src/app/Modelo/Rutina';
import { Suplemento } from 'src/app/Modelo/Suplemento';
import { Cotizacion } from 'src/app/Modelo/Cotizacion';
import { ServiceService } from 'src/app/Service/service.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-cotizacion.component.html',
  styleUrls: ['./add-cotizacion.component.css']
})
export class AddCotizacionComponent implements OnInit, AfterViewInit {

  @Output() cotizacionAgregado: EventEmitter<void> = new EventEmitter<void>();

  modeloCliente: Cliente = new Cliente();
  modeloServicio: Servicio = new Servicio();
  modeloRutina: Rutina = new Rutina();
  modeloSuplemento: Suplemento = new Suplemento();
  modeloCotizacion: Cotizacion = new Cotizacion();

  servicios: Servicio[];
  servicioSeleccionado: Servicio | null = null;

  rutinas: Rutina[];
  rutinaSeleccionado: Rutina | null = null;

  suplementos: Suplemento[];
  suplementoSeleccionado: Suplemento | null = null;

  montoTotal: number | null = null;

  modoEdicion: boolean = false;
  botonGuardarVisible: boolean = true;
  camposVacios: boolean = true;

  form: FormGroup;

  constructor(private router: Router, private service: ServiceService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.getServicios();
    this.getRutinas();
    this.getSuplementos();
    this.editar();

    // Asignar un valor predeterminado a modeloCliente.id si es undefined
    if (this.modeloCliente.id === undefined) {
      this.modeloCliente.id = 0; // o cualquier otro valor predeterminado que desees
    }
  }

  ngAfterViewInit() {
    const formFields = Array.from(document.querySelectorAll('.campo-formulario input')) as HTMLInputElement[];
    const submitButton = document.querySelector('.button-enviar') as HTMLButtonElement | null;
    if (submitButton) {
      formFields.forEach(field => {
        field.addEventListener('input', () => {
          const anyFieldEmpty = formFields.some(input => input.value.trim() === '');
          if (anyFieldEmpty) {
            submitButton.classList.add('disabled');
            this.camposVacios = true;
          } else {
            submitButton.classList.remove('disabled');
            this.camposVacios = false;
          }
        });
      });

      if (this.camposVacios) {
        submitButton.classList.add('disabled');
      }
    }
  }

  getServicios() {
    this.service.getServicios().subscribe(data => {
      this.servicios = data;
    });
  }

  getRutinas() {
    this.service.getRutinas().subscribe(data => {
      this.rutinas = data;
    });
  }

  getSuplementos() {
    this.service.getSuplementos().subscribe(data => {
      this.suplementos = data;
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id_cliente: new FormControl('', []),
      nombre_servicio: new FormControl('', [Validators.required]),
      nombre_suplemento: new FormControl('', [Validators.required]),
      nombre_rutina: new FormControl('', [Validators.required]),
      estado_cotizacion: new FormControl('', [Validators.required]),
      observacion_cotizacion: new FormControl('', [Validators.required]),
      monto_cotizacion: new FormControl('', [])
    });
  }

  limpiarFormulario() {
    this.modeloCotizacion = new Cotizacion();
    this.modoEdicion = false;
    this.botonGuardarVisible = true;
  }

  guardar(cotizacion: Cotizacion) {
    if (this.modoEdicion) {
    } else {
      this.service.createCotizacion(cotizacion)
        .subscribe(data => {
          alert("Se agregó con éxito...!!");
          this.limpiarFormulario();
          this.cotizacionAgregado.emit();
        });
    }
  }

  editar() {
    let id: any = localStorage.getItem("id");
    this.service.getClienteId(+id)
      .subscribe(data => {
        this.modeloCliente = data;
      })
  }


  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.guardar(this.modeloCotizacion);
      console.log(this.modeloCotizacion);
    } else {
      this.form.markAllAsTouched();
    }
  }

  calcularMontoTotal() {
    const precioServicio = this.servicioSeleccionado ? this.servicioSeleccionado.precio_servicio : 0;
    const precioSuplemento = this.suplementoSeleccionado ? this.suplementoSeleccionado.precio_suplemento : 0;
    this.montoTotal = precioServicio + precioSuplemento;
  }

  actualizarPrecioServicio() {
    const idServicioSeleccionado: number = parseInt(this.modeloServicio.nombre_servicio.toString(), 10);
    this.servicioSeleccionado = this.servicios.find(servicio => servicio.id === idServicioSeleccionado) || null;
    this.calcularMontoTotal();
  }

  actualizarPrecioSuplemento() {
    const idSuplementoSeleccionado: number = parseInt(this.modeloSuplemento.nombre_suplemento.toString(), 10);
    this.suplementoSeleccionado = this.suplementos.find(suplemento => suplemento.id === idSuplementoSeleccionado) || null;
    this.calcularMontoTotal();
  }

  cancelar() {
    this.router.navigate(["cliente"]);
  }
}
