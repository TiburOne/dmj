import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoAcopladoService } from '../../services/tipo_acoplado.service';
import { TipoAcoplado } from 'src/app/Models/Tipo_Acoplado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-tipo-acoplado',
  templateUrl: './modal-tipo-acoplado.component.html',
  styleUrls: ['./modal-tipo-acoplado.component.css']
})
export class ModalTipoAcopladoComponent {

  tipoAcoplado: TipoAcoplado;

  constructor(
    private dialogRef: MatDialogRef<ModalTipoAcopladoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoAcoplado, private tipoAcopladoService: TipoAcopladoService
  ) {
    if (data) {
      this.tipoAcoplado = data;  // Usar datos existentes si están disponibles
    } else {
      this.tipoAcoplado = {
        id: 0, // Asigna un id predeterminado o gestiona como prefieras
        tipo: '',
        cantidad_ejes: 0  // Asegura que todos los campos estén inicializados
      };
    }
  }

  create_or_update() {
    if (this.tipoAcoplado.id === 0) {
      // Crear
      this.tipoAcopladoService.crear(this.tipoAcoplado).subscribe({
        next: (value: TipoAcoplado) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Tipo de Acoplado creado con éxito',
            icon: 'success'
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo crear el Tipo de Acoplado',
            icon: 'error'
          });
        },
      });
    } else {
      // Actualizar
      this.tipoAcopladoService.update(this.tipoAcoplado).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Tipo de Acoplado actualizado con éxito',
            icon: 'success'
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el Tipo de Acoplado',
            icon: 'error'
          });
        }
      });
    }
  }

}
