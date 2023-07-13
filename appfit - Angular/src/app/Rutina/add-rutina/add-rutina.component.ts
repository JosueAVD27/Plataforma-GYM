import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from 'src/app/Modelo/Rutina';
import { ServiceService } from 'src/app/Service/service.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-rutina',
  templateUrl: './add-rutina.component.html',
  styleUrls: ['./add-rutina.component.css']
})
export class AddRutinaComponent implements OnInit, AfterViewInit {

  @Output() rutinaAgregado: EventEmitter<void> = new EventEmitter<void>();

  modeloRutina: Rutina = new Rutina();

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
      nombre_rutina: new FormControl('', [Validators.required]),
      duracion_rutina: new FormControl('', [Validators.required]),
      descripcion_rutina: new FormControl('', [Validators.required]),
      dias_rutina: new FormControl('', [Validators.required]),
      material_rutina: new FormControl('', [Validators.required])
    });
  }

  limpiarFormulario() {
    this.modeloRutina = new Rutina();
    this.modoEdicion = false;
    this.botonGuardarVisible = true;
  }

  guardar(rutina: Rutina) {
    if (this.modoEdicion) {
      // Código para la edición de rutina
    } else {
      this.service.createRutina(rutina)
        .subscribe(data => {
          alert("Se agregó con éxito...!!");
          this.limpiarFormulario();
          this.limpiarChecks();
          this.rutinaAgregado.emit();
        });
    }
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.guardar(this.modeloRutina);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onDiaSeleccionado(event: Event) {
    const selectedDias = Array.from(document.querySelectorAll('input[name="dias[]"]:checked'))
      .map((checkbox: Element) => (checkbox as HTMLInputElement).value);
    this.modeloRutina.dias_rutina = selectedDias.join(', ');
  }

  onMaterialSeleccionado(event: Event) {
    const selectedDias = Array.from(document.querySelectorAll('input[name="material[]"]:checked'))
      .map((checkbox: Element) => (checkbox as HTMLInputElement).value);
    this.modeloRutina.material_rutina = selectedDias.join(', ');
  }

  private limpiarChecks() {
    const diasCheckboxes = Array.from(document.querySelectorAll('input[name="dias[]"]')) as HTMLInputElement[];
    diasCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    const materialCheckboxes = Array.from(document.querySelectorAll('input[name="material[]"]')) as HTMLInputElement[];
    materialCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }
}
