import { Component, OnDestroy, OnInit } from '@angular/core';
import { CRUDService, SERVICE_CONFIG } from '../../services/crud.service';
import { Ubicacion } from 'src/app/Models/Ubicacion';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UbicacionComponent } from '../crear/ubicacion.component';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [
    CRUDService,
    {
      provide: SERVICE_CONFIG,
      useValue: { endpoint: 'ubicacion' }
    }
  ],
})
export class ListarComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'nombre', 'ciudad', 'provincia', 'direccion', 'actions'];
  dataSource: Ubicacion[] = [];
  filterData: Ubicacion[] = [];
  subscripcion!: Subscription;
  filters: string="";

  constructor(private crudService: CRUDService<Ubicacion>,  private dialog: MatDialog) {}
  ngOnDestroy(): void {
    this?.subscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
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
    const dialogRef = this.dialog.open(UbicacionComponent, {
      width: '1200px',
      data: null // No data needed for creation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData(); // Reload data if a new location is added
      }
    });
  }

  openEditModal(ubicacion: Ubicacion) {
    const dialogRef = this.dialog.open(UbicacionComponent, {
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
