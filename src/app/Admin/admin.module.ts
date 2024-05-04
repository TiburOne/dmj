import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './Layout/layout.component';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { MaterialModule } from '../common_modules/material.module';
import { EspeciesComponent } from './especies/especies.component';
import { TransportistasListaComponent } from './transportistas-lista/transportistas-lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalEspecieComponent } from './especies/modal-especie/modal-especie.component';
import { ModalTransportistaComponent } from './transportistas-lista/modal-transportista/modal-transportista.component';
import { TipoAcopladoComponent } from './tipo-acoplado/tipo-acoplado.component';
import { ModalTipoAcopladoComponent } from './tipo-acoplado/modal-tipo-acoplado/modal-tipo-acoplado.component';
import { EstadoViajesComponent } from './estado-viajes/estado-viajes.component';
import { ModaleEstadosViajesComponent } from './estado-viajes/modale-estados-viajes/modale-estados-viajes.component';



@NgModule({
  declarations: [
    LayoutComponent,
    NavBarComponent,
    EspeciesComponent,
    TransportistasListaComponent,
    ModalEspecieComponent,
    ModalTransportistaComponent,
    TipoAcopladoComponent,
    ModalTipoAcopladoComponent,
    EstadoViajesComponent,
    ModaleEstadosViajesComponent


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
