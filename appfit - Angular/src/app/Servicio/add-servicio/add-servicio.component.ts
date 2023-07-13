import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/Modelo/Servicio';
import { ServiceService } from 'src/app/Service/service.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-servicio',
  templateUrl: './add-servicio.component.html',
  styleUrls: ['./add-servicio.component.css']
})
export class AddServicioComponent implements OnInit, AfterViewInit {

  @Output() servicioAgregado: EventEmitter<void> = new EventEmitter<void>();

  modeloServicio: Servicio = new Servicio();
  modoEdicion: boolean = false;
  botonGuardarVisible: boolean = true;
  camposVacios: boolean = true;

  form: FormGroup;

  constructor(private router: Router, private service: ServiceService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    const formFields = Array.from(document.querySelectorAll('.campo-formulario input')) as HTMLInputElement[];
    const submitButton = document.querySelector('.button-agregar') as HTMLButtonElement | null;
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

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre_servicio: new FormControl('', [Validators.required]),
      descripcion_servicio: new FormControl('', [Validators.required]),
      precio_servicio: new FormControl('', [Validators.required]),
      duracion_servicio: new FormControl('', [Validators.required]),
      promocion_servicio: new FormControl('', [Validators.required]),
      observaciones_servicio: new FormControl('', [Validators.required]),
    });
  }

  limpiarFormulario() {
    this.modeloServicio = new Servicio();
    this.modoEdicion = false;
    this.botonGuardarVisible = true;
  }

  guardar(servicio: Servicio) {
    if (this.modoEdicion) {
    } else {
      this.service.createServicio(servicio)
      .subscribe(data => {
        alert("Se agregó con éxito...!!");
        this.limpiarFormulario();
        this.servicioAgregado.emit(); // Emitir el evento clienteAgregado
      });
    }
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.guardar(this.modeloServicio);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
