import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { CamionesComponent } from './camiones/camiones.component';
import { ChoferesComponent } from './choferes/choferes.component';

const routes: Routes = [
  {path: ':id', component: LayoutComponent,
    children:[
      {path: 'camiones', component: CamionesComponent},
      {path: 'choferes', component: ChoferesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportistasRoutingModule { }
