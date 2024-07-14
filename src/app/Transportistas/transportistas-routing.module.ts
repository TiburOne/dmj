import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { CamionesComponent } from './camiones/camiones.component';
import { ChoferesComponent } from './choferes/choferes.component';
import { AcopladosComponent } from './acoplados/acoplados.component';
import { ListarViajesComponent } from './viajes/listar-viajes/listar-viajes.component';
import { AsignarViajeComponent } from './viajes/asignar-viaje/asignar-viaje.component';

const routes: Routes = [
  {path: ':id', component: LayoutComponent,
    children:[
      {path: 'camiones', component: CamionesComponent},
      {path: 'choferes', component: ChoferesComponent},
      {path: 'acoplados', component: AcopladosComponent},
      {path: 'viajes', component: ListarViajesComponent},
      {path: 'asignar-viaje', component: AsignarViajeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportistasRoutingModule { }
