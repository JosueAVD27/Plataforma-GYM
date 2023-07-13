import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Suplemento } from 'src/app/Modelo/Suplemento';
import { ServiceService } from 'src/app/Service/service.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-suplemento',
  templateUrl: './edit-suplemento.component.html',
  styleUrls: ['./edit-suplemento.component.css']
})
export class EditSuplementoComponent implements OnInit {

  modeloSuplemento: Suplemento = new Suplemento();

  form: FormGroup;

  constructor(private router: Router, private service: ServiceService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.editar();
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


  editar() {
    let id: any = localStorage.getItem("id");
    this.service.getSuplementoId(+id).subscribe(data => {
      this.modeloSuplemento = data;
    });
  }

  actualizar(suplemento: Suplemento) {
    this.service.updateSuplemento(suplemento)
      .subscribe(data => {
        alert("Se actualizo con exito...! ");
        this.router.navigate(["suplemento"]);
      })
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.actualizar(this.modeloSuplemento);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(["suplemento"]);
  }
}
