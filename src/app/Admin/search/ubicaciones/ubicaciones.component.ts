import { Component, EventEmitter, Output } from '@angular/core';
import { Ubicacion } from 'src/app/Models/Ubicacion';
import { CRUDService, SERVICE_CONFIG } from '../../services/crud.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css'],
  providers: [
    CRUDService,
    {
      provide: SERVICE_CONFIG,
      useValue: { endpoint: 'ubicacion' }
    }
  ],
})
export class UbicacionesComponent {

  allUbicaciones: Ubicacion[] = [];  // Almacena todas las ubicaciones
  ubicaciones: Ubicacion[] = [];     // Almacena las ubicaciones filtradas
  filter: string = '';
  displayedColumns: string[] = ['id', 'nombre', 'ciudad', 'provincia', 'direccion', 'actions'];

  constructor(private crudService: CRUDService<Ubicacion>, public dialogRef: MatDialogRef<UbicacionesComponent> ) {}

  ngOnInit(): void {
    this.loadUbicaciones();
  }

  loadUbicaciones(): void {
    this.crudService.getAll().subscribe({
      next: (res) => {
        this.allUbicaciones = res.map(x=> new Ubicacion(x) );
        this.ubicaciones = res;  // Inicialmente, todas las ubicaciones están sin filtrar
      },
      error: (err) => console.error('Error fetching ubicaciones:', err)
    });
  }


  onFilterChange(): void {
    if (this.filter) {
      this.ubicaciones = this.allUbicaciones.filter(ubicacion =>
        ubicacion.getText().toLowerCase().includes(this.filter.toLowerCase()));
    } else {
      this.ubicaciones = this.allUbicaciones;  // No hay filtro aplicado
    }
  }

  onEntityDoubleClick(ubicacion: Ubicacion): void {
    this.dialogRef.close(ubicacion);  // Cierra el modal y devuelve la ubicación seleccionada
  }

}
