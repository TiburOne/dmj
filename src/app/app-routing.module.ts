import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [

  {path: '', redirectTo: 'admin', pathMatch:'full'},
  {path: 'admin', loadChildren:()=> import('./Admin/admin.module').then(m=> m.AdminModule)},
  {path: 'transportista', loadChildren:()=> import('./Transportistas/transportistas.module').then(m=> m.TransportistasModule)},


  { path: '**', component: AppComponent } // para manejar rutas desconocidas
  // { path: 'asegurados', component:ClientesComponent},
  // { path: 'ver-polizas', component:VerPolizasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
