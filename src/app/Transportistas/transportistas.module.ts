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
import { ListarViajesComponent } from './viajes/listar-viajes/listar-viajes.component';
import { TomarViajeComponent } from './viajes/tomar-viaje/tomar-viaje.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../common_modules/custom-paginator-intl';


@NgModule({
  declarations: [
    NavBarComponent,
    LayoutComponent,
    ChoferesComponent,
    CamionesComponent,
    AcopladosComponent,
    ModalChoferComponent,
    ModalCamionComponent,
    ModalAcopladoComponent,
    ListarViajesComponent,
    TomarViajeComponent
  ],
  imports: [
    CommonModule,
    TransportistasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
  ],
})
export class TransportistasModule { }
