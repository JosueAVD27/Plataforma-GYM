import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Modelo/Cliente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^\S+\s\S+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^\S+\s\S+$/)]],
      cedula: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      codigo_postal: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  save() {
    if (this.form.valid) {
      const cliente: Cliente = this.form.value;
      this.service.createCliente(cliente).subscribe(() => {
        alert('Cliente guardado exitosamente');
        this.router.navigate(['/listar']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
