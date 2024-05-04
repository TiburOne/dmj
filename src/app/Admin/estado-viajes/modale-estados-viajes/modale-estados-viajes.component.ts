import { Component, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { EstadoViajesService } from '../../services/estado_viajes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstadoViajes } from 'src/app/Models/EstadoViaje';

@Component({
  selector: 'app-modale-estados-viajes',
  templateUrl: './modale-estados-viajes.component.html',
  styleUrls: ['./modale-estados-viajes.component.css']
})
export class ModaleEstadosViajesComponent {
  nombre: string;

  constructor(
    private dialogRef: MatDialogRef<ModaleEstadosViajesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private estadoService: EstadoViajesService
  ) {
    this.nombre = !data ? "" : data.nombre;
  }

  create_or_update() {
    if (this.data) {
      // Aquí agregarías la lógica para actualizar
      const estado: EstadoViajes = {
        id: this.data.id,
        nombre: this.nombre,

      }
      this.estadoService.update(estado).subscribe(
        {
          next: (res: any) => {
            Swal.fire({
              title: 'Éxito',
              text: 'Estado de viaje actualizado con éxito',
              icon: 'success'
            });
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);

            Swal.fire({
              title: 'Error',
              text: 'No se pudo acutualizar el estado de viaje',
              icon: 'error'
            });
          }
        }
      );
    } else {
      // Crear
      this.estadoService.crear(this.nombre).subscribe({
        next: (value: EstadoViajes) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Especie creada con éxito',
            icon: 'success'
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo crear la especie',
            icon: 'error'
          });
        },
      });
    }
  }
}
