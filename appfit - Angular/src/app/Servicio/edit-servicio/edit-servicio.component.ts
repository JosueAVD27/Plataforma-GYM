import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Servicio } from 'src/app/Modelo/Servicio';
import { ServiceService } from 'src/app/Service/service.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-servicio',
  templateUrl: './edit-servicio.component.html',
  styleUrls: ['./edit-servicio.component.css']
})
export class EditServicioComponent implements OnInit {

  modeloServicio: Servicio = new Servicio();

  form: FormGroup;

  constructor(private router: Router, private service: ServiceService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.editar();
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



  editar() {
    let id: any = localStorage.getItem("id");
    this.service.getServicioId(+id)
      .subscribe(data => {
        this.modeloServicio = data;
      })
  }

  actualizar(servicio: Servicio) {
    this.service.updateServicio(servicio)
      .subscribe(data => {
        alert("Se actualizo con exito...! ");
        this.router.navigate(["servicio"]);
      })
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.actualizar(this.modeloServicio);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(["servicio"]);
  }

}
