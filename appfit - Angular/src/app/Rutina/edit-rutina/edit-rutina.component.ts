import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Rutina } from 'src/app/Modelo/Rutina';
import { ServiceService } from 'src/app/Service/service.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-rutina',
  templateUrl: './edit-rutina.component.html',
  styleUrls: ['./edit-rutina.component.css']
})
export class EditRutinaComponent implements OnInit {

  modeloRutina: Rutina = new Rutina();

  form: FormGroup;

  constructor(private router: Router, private service: ServiceService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.editar();
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


  editar() {
    let id: any = localStorage.getItem("id");
    this.service.getRutinaId(+id).subscribe(data => {
      this.modeloRutina = data;

      // Obtener los días seleccionados
      const diasSeleccionados = this.modeloRutina.dias_rutina.split(', ');

      // Marcar los checkboxes correspondientes
      const dias_checkboxes = document.querySelectorAll<HTMLInputElement>('input[name="dias[]"]');
      dias_checkboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = diasSeleccionados.includes(checkbox.value);
      });

      // Obtener los materiales seleccionados
      const materialesSeleccionados = this.modeloRutina.material_rutina.split(', ');

      // Marcar los checkboxes correspondientes
      const materiales_checkboxes = document.querySelectorAll<HTMLInputElement>('input[name="material[]"]');
      materiales_checkboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = materialesSeleccionados.includes(checkbox.value);
      });
    });
  }

  actualizar(Rutina: Rutina) {
    this.service.updateRutina(Rutina)
      .subscribe(data => {
        alert("Se actualizo con exito...! ");
        this.router.navigate(["rutina"]);
      })
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.actualizar(this.modeloRutina);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(["rutina"]);
  }

  onDiaSeleccionado(event: Event) {
    const selectedDias = Array.from(document.querySelectorAll('input[name="dias[]"]:checked'))
      .map((checkbox: Element) => (checkbox as HTMLInputElement).value);
    this.modeloRutina.dias_rutina = selectedDias.join(', ');
  }

  onMaterialSeleccionado(event: Event) {
    const selectedMaterial = Array.from(document.querySelectorAll('input[name="material[]"]:checked'))
      .map((checkbox: Element) => (checkbox as HTMLInputElement).value);
    this.modeloRutina.material_rutina = selectedMaterial.join(', ');
  }
}