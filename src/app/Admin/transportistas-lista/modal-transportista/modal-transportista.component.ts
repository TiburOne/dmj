import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransportistaService } from '../../services/transportista.service';
import Swal from 'sweetalert2';
import { Transportista } from 'src/app/Models/Transportista';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-transportista',
  templateUrl: './modal-transportista.component.html',
  styleUrls: ['./modal-transportista.component.css']
})
export class ModalTransportistaComponent {
  nombre: string = "";
  cuit: number = 0;
  email: string = "";
  telefono: string = "";
  transportistaForm: FormGroup;


  constructor(
    private dialogRef: MatDialogRef<ModalTransportistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transportista, private transportistaService: TransportistaService,
    private fb: FormBuilder,
  ) {
    // Inicializar formulario con datos existentes o valores por defecto
    this.transportistaForm = this.fb.group({
      nombre: [this.data ? this.data.nombre : '', Validators.required],
      cuit: [this.data ? this.data.cuit : '', Validators.required],
      email: [this.data ? this.data.email : '', Validators.email],
      telefono: [this.data ? this.data.telefono : '']
    });
  }


  create_or_update() {

    if (this.transportistaForm.valid) {
      const transportista: Transportista = this.transportistaForm.value;
      transportista.id = this.data ? this.data.id : undefined; // Asignar ID solo si se está actualizando

      if (this.data) {
        // Actualizar transportista existente
        this.transportistaService.update(transportista).subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Éxito',
              text: 'Transportista actualizado con éxito',
              icon: 'success'
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error al actualizar el transportista:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar el transportista',
              icon: 'error'
            });
          }
        });
      } else {
        // Crear nuevo transportista
        this.transportistaService.create(transportista).subscribe({
          next: (newTransportista) => {
            Swal.fire({
              title: 'Éxito',
              text: 'Transportista creado con éxito',
              icon: 'success'
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error al crear el transportista:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo crear el transportista',
              icon: 'error'
            });
          }
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
