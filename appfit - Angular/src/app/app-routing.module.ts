import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { AddCotizacionComponent } from './Cotizacion/add-cotizacion/add-cotizacion.component';

const routes: Routes = [
  {path:'cliente', component:ListarComponent},
  {path:'cliente/add', component:AddComponent},
  {path:'cliente/edit', component:EditComponent},

  {path:'servicio', component:ListarServicioComponent},
  {path:'servicio/add', component:AddServicioComponent},
  {path:'servicio/edit', component:EditServicioComponent},

  {path:'rutina', component:ListarRutinaComponent},
  {path:'rutina/add', component:AddRutinaComponent},
  {path:'rutina/edit', component:EditRutinaComponent},

  {path:'suplemento', component:ListarSuplementoComponent},
  {path:'suplemento/add', component:AddSuplementoComponent},
  {path:'suplemento/edit', component:EditSuplementoComponent},

  {path:'cliente/cotizacion', component:AddCotizacionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
