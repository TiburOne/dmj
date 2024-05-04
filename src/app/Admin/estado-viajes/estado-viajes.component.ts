import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadoViajesService } from '../services/estado_viajes.service';
import { MatDialog } from '@angular/material/dialog';
import { ModaleEstadosViajesComponent } from './modale-estados-viajes/modale-estados-viajes.component';

@Component({
  selector: 'app-estado-viajes',
  templateUrl: './estado-viajes.component.html',
  styleUrls: ['./estado-viajes.component.css']
})
export class EstadoViajesComponent {

  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource: any[] = [];

  filters: any = {};

  subscripcion!: Subscription;

  constructor(private estadoViajeService: EstadoViajesService, private dialog: MatDialog) {

  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
  ngOnInit(): void {
    this.loadEstados();
  }

  loadEstados() {
    try {
      this.subscripcion =  this.estadoViajeService.obtenerEstados().subscribe({
        next: (estados: any) => {
          console.log(estados);
          this.dataSource = estados;
        },
        error: (error) => {
          console.log(error);
          //TODO: Agregar mensaje de error con sweetalert2
          this.dataSource = [];
        }
      });

    } catch (error) {
      //TODO: Agregar mensaje de error con sweetalert2
      this.dataSource = [];
    }
  }

  applyFilters(): void {
    //TODO: Aplicar filtros al datasource, usar un arreglo intermedio para no perder los datos
    //this.loadEspecies();
  }

  addNew() {
    // Lógica para abrir un modal de formulario o navegar a una página de creación
    console.log('Agregar nueva especie');

    const dialogRef = this.dialog.open(ModaleEstadosViajesComponent, {
      width: '350px',

    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.loadEstados(); // Solo  los especies si se creo alguna
      }
    });
  }

  openEditModal(estado: any) {

    const dialogRef = this.dialog.open(ModaleEstadosViajesComponent, {
      width: '350px',
      data: {
        id: estado.id,
        nombre: estado.nombre
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadEstados(); // Solo recargar  si se actualizó
      }
    });

  }
}
