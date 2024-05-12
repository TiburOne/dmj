import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViajeComun } from 'src/app/Models/Viaje';
import { CRUDService, SERVICE_CONFIG } from '../../services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearViajesComponent } from '../crear-viajes/crear-viajes.component';

@Component({
  selector: 'app-listar-viajes',
  templateUrl: './listar-viajes.component.html',
  styleUrls: ['./listar-viajes.component.css'],
  providers: [
    CRUDService,
    {
      provide: SERVICE_CONFIG,
      useValue: { endpoint: 'viaje_comun' }
    }
  ],
})
export class ListarViajesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'origen', 'destino', 'especie', 'estado', 'actions'];
  dataSource: ViajeComun[] = [];

  filters: string ="" ;

  subscripcion!: Subscription;
  filterData: ViajeComun[] = [];

  constructor(private crudService: CRUDService<ViajeComun>, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this?.subscripcion.unsubscribe();
  }

  loadData() {
    try {
      this.subscripcion = this.crudService.getAll().subscribe({
        next: (data) => {
          console.log(data);
          this.dataSource = data;
          this.filterData = this.dataSource;
        },
        error: (err) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
      this.dataSource = [];
      this.filterData = [];
    }

  }
  applyFilters(): void {
    //TODO: Aplicar filtros al datasource, usar un arreglo intermedio para no perder los datos
    //this.loadEspecies();
  }

  addNew() {
    const dialogRef = this.dialog.open(CrearViajesComponent, {
      width: '1200px',
      data: null // No data needed for creation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData(); // Reload data if a new location is added
      }
    });
  }
  openEditModal(ubicacion: ViajeComun) {
    const dialogRef = this.dialog.open(CrearViajesComponent, {
      width: '1200px',
      data: ubicacion // Pass the current ubicacion to be edited
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData(); // Reload data if a location is updated
      }
    });
  }


}
