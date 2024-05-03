import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EspecieService } from '../../services/especie.service';
import { Especie } from 'src/app/Models/Especie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-especie',
  templateUrl: './modal-especie.component.html',
  styleUrls: ['./modal-especie.component.css']
})
export class ModalEspecieComponent {

  nombre: string;

  constructor(
    private dialogRef: MatDialogRef<ModalEspecieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private especieService: EspecieService
  ) {
    this.nombre = !data ? "" : data.nombre;
  }

  create_or_update() {
    if (this.data) {
      // Aquí agregarías la lógica para actualizar
      const especie: Especie = {
        id: this.data.id,
        nombre: this.nombre,

      }
      this.especieService.update(especie).subscribe(
        {
          next: (res: any) => {
            Swal.fire({
              title: 'Éxito',
              text: 'Especie actualizada con éxito',
              icon: 'success'
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);

            Swal.fire({
              title: 'Error',
              text: 'No se pudo acutualizar la especie',
              icon: 'error'
            });
          }
        }
      );
    } else {
      // Crear
      this.especieService.crear(this.nombre).subscribe({
        next: (value: Especie) => {
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
