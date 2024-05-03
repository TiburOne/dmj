import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportistasRoutingModule } from './transportistas-routing.module';
import { MaterialModule } from '../common_modules/material.module';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { LayoutComponent } from './Layout/layout.component';
import { ChoferesComponent } from './choferes/choferes.component';
import { CamionesComponent } from './camiones/camiones.component';
import { AcopladosComponent } from './acoplados/acoplados.component';
import { ModalChoferComponent } from './choferes/modal-chofer/modal-chofer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCamionComponent } from './camiones/modal-camion/modal-camion.component';
import { ModalAcopladoComponent } from './acoplados/modal-acoplado/modal-acoplado.component';


@NgModule({
  declarations: [
    NavBarComponent,
    LayoutComponent,
    ChoferesComponent,
    CamionesComponent,
    AcopladosComponent,
    ModalChoferComponent,
    ModalCamionComponent,
    ModalAcopladoComponent
  ],
  imports: [
    CommonModule,
    TransportistasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TransportistasModule { }
