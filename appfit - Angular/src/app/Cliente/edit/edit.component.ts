import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Cliente } from 'src/app/Modelo/Cliente';
import { ServiceService } from 'src/app/Service/service.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  modeloCliente: Cliente = new Cliente();

  form: FormGroup;

  constructor(private router: Router, private service: ServiceService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.editar();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^\S+\s\S+$/)]),
      apellido: new FormControl('', [Validators.required, Validators.pattern(/^\S+\s\S+$/)]),
      cedula: new FormControl('', [Validators.required, this.validarCedula]),
      telefono: new FormControl('', [Validators.required, this.validarTelefono]),
      fecha_nacimiento: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
    });
  }

  validarCedula(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value as string;

    if (cedula.length !== 10) {
      return { cedulaInvalida: true, mensaje: 'La cédula debe tener 10 dígitos' };
    }

    // Verificar si todos los dígitos son iguales
    if (new Set(cedula).size === 1) {
      return { cedulaInvalida: true, mensaje: 'La cédula es inválida' };
    }

    // Verificar el código de la provincia
    const codigoProvincia = Number(cedula.slice(0, 2));
    if (codigoProvincia <= 0 || (codigoProvincia > 24 && codigoProvincia !== 30)) {
      return { cedulaInvalida: true, mensaje: 'La cédula es inválida' };
    }

    // Verificar el tercer dígito
    const tercerDigito = Number(cedula.charAt(2));
    if (tercerDigito > 5) {
      return { cedulaInvalida: true, mensaje: 'La cédula es inválida' };
    }

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digitoVerificador = Number(cedula.charAt(9));

    let suma = 0;
    let resultado;

    for (let i = 0; i < coeficientes.length; i++) {
      let valor = Number(cedula.charAt(i)) * coeficientes[i];
      if (valor > 9) {
        valor -= 9;
      }
      suma += valor;
    }

    if (suma % 10 === 0) {
      resultado = 0;
    } else {
      resultado = 10 - (suma % 10);
    }

    if (resultado !== digitoVerificador) {
      return { cedulaInvalida: true, mensaje: 'La cédula es inválida' };
    }
    return null;
  }

  validarTelefono(control: AbstractControl): ValidationErrors | null {
    const telefono = control.value as string;

    if (telefono.length !== 10) {
      return { telefonoInvalido: true, mensaje: 'El número de teléfono debe tener 10 dígitos' };
    }

    const primerosDosDigitos = telefono.slice(0, 2);
    if (
      primerosDosDigitos !== '09' &&
      primerosDosDigitos !== '02' &&
      primerosDosDigitos !== '03' &&
      primerosDosDigitos !== '04' &&
      primerosDosDigitos !== '05' &&
      primerosDosDigitos !== '06' &&
      primerosDosDigitos !== '07'
    ) {
      return { telefonoInvalido: true, mensaje: 'El número de teléfono es inválido' };
    }

    return null;
  }

  editar() {
    let id: any = localStorage.getItem("id");
    this.service.getClienteId(+id)
      .subscribe(data => {
        this.modeloCliente = data;
      })
  }

  actualizar(Cliente: Cliente) {
    this.service.updateCliente(Cliente)
      .subscribe(data => {
        alert("Se actualizo con exito...! ");
        this.router.navigate(["cliente"]);
      })
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.actualizar(this.modeloCliente);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(["cliente"]);
  }
}
