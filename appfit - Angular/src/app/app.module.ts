import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceService } from '../app/Service/service.service';

import { ListarComponent } from './Cliente/listar/listar.component';
import { AddComponent } from './Cliente/add/add.component';
import { EditComponent } from './Cliente/edit/edit.component';

import { ListarServicioComponent } from './Servicio/listar-servicio/listar-servicio.component';
import { AddServicioComponent } from './Servicio/add-servicio/add-servicio.component';
import { EditServicioComponent } from './Servicio/edit-servicio/edit-servicio.component';

import { ListarRutinaComponent } from './Rutina/listar-rutina/listar-rutina.component';
import { AddRutinaComponent } from './Rutina/add-rutina/add-rutina.component';
import { EditRutinaComponent } from './Rutina/edit-rutina/edit-rutina.component';

import { ListarSuplementoComponent } from './Suplemento/listar-suplemento/listar-suplemento.component';
import { AddSuplementoComponent } from './Suplemento/add-suplemento/add-suplemento.component';
import { EditSuplementoComponent } from './Suplemento/edit-suplemento/edit-suplemento.component';
import { ListarCotizacionComponent } from './Cotizacion/listar-cotizacion/listar-cotizacion.component';
import { AddCotizacionComponent } from './Cotizacion/add-cotizacion/add-cotizacion.component';
import { EditCotizacionComponent } from './Cotizacion/edit-cotizacion/edit-cotizacion.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    AddComponent,
    EditComponent,
    ListarServicioComponent,
    AddServicioComponent,
    EditServicioComponent,
    ListarRutinaComponent,
    AddRutinaComponent,
    EditRutinaComponent,
    ListarSuplementoComponent,
    AddSuplementoComponent,
    EditSuplementoComponent,
    ListarCotizacionComponent,
    AddCotizacionComponent,
    EditCotizacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }