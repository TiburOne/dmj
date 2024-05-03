import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { TransportistasListaComponent } from './transportistas-lista/transportistas-lista.component';
import { EspeciesComponent } from './especies/especies.component';
import { TipoAcopladoComponent } from './tipo-acoplado/tipo-acoplado.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
    children:[
      {path: 'transportistas', component: TransportistasListaComponent},
      {path: 'especies', component: EspeciesComponent},
      {path: 'tipo-acoplados', component: TipoAcopladoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
