import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { CRUDService, SERVICE_CONFIG } from 'src/app/Admin/services/crud.service';
import { Camion } from 'src/app/Models/Camion';
import { ModalCamionComponent } from './modal-camion/modal-camion.component';

@Component({
  selector: 'app-camiones',
  templateUrl: './camiones.component.html',
  styleUrls: ['./camiones.component.css'],
  providers:[
    CRUDService,{
      provide: SERVICE_CONFIG,
      useValue: {endpoint: 'camiones'}
    }
  ]
})
export class CamionesComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['id', 'dominio', 'actions'];
  dataSource: Camion[] = [];

  filters: string = "" ;

  subscripcion!: Subscription;
  filterData: Camion[] = []

  constructor(private crudService: CRUDService<Camion>, private dialog: MatDialog){

  }

  ngOnDestroy(): void {
    this?.subscripcion.unsubscribe();
  }
  ngOnInit(): void {
    this.loadData();
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
    const dialogRef = this.dialog.open(ModalCamionComponent, {
      //width: '1200px',
      data: null // No data needed for creation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData(); // Reload data if a new location is added
      }
    });
  }
  openEditModal(camion: Camion) {
    const dialogRef = this.dialog.open(ModalCamionComponent, {
      //width: '1200px',
      data: camion // Pass the current ubicacion to be edited
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData(); // Reload data if a location is updated
      }
    });
  }


}
