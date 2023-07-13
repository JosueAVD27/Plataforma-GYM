import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suplemento } from 'src/app/Modelo/Suplemento';
import { ServiceService } from 'src/app/Service/service.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-suplemento',
  templateUrl: './add-suplemento.component.html',
  styleUrls: ['./add-suplemento.component.css']
})
export class AddSuplementoComponent implements OnInit, AfterViewInit {

  @Output() suplementoAgregado: EventEmitter<void> = new EventEmitter<void>();

  modeloSuplemento: Suplemento = new Suplemento();

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
      nombre_suplemento: new FormControl('', [Validators.required]),
      descripcion_suplemento: new FormControl('', [Validators.required]),
      marca_suplemento: new FormControl('', [Validators.required]),
      categoria_suplemento: new FormControl('', [Validators.required]),
      presentacion_suplemento: new FormControl('', [Validators.required]),
      instrucciones_suplemento: new FormControl('', [Validators.required]),
      precio_suplemento: new FormControl('', [Validators.required]),
      disponibilidad_suplemento: new FormControl('', [Validators.required])
    });
  }

  limpiarFormulario() {
    this.modeloSuplemento = new Suplemento();
    this.modoEdicion = false;
    this.botonGuardarVisible = true;
  }

  guardar(suplemento: Suplemento) {
    if (this.modoEdicion) {
      // Código para la edición de rutina
    } else {
      this.service.createSuplemento(suplemento)
        .subscribe(data => {
          alert("Se agregó con éxito...!!");
          this.limpiarFormulario();
          this.suplementoAgregado.emit();
        });
    }
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.guardar(this.modeloSuplemento);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
