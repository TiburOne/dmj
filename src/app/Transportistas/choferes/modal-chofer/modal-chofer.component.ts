import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChoferService } from '../../services/chofer.service';
import Swal from 'sweetalert2';
import { Chofer } from 'src/app/Models/Chofer';

@Component({
  selector: 'app-modal-chofer',
  templateUrl: './modal-chofer.component.html',
  styleUrls: ['./modal-chofer.component.css']
})
export class ModalChoferComponent {
  choferForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModalChoferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Chofer,
    private choferService: ChoferService,
    private fb: FormBuilder,
  ) {
    this.choferForm = this.fb.group({
      nombre: [this.data ? this.data.nombre : '', Validators.required],
      apellido: [this.data ? this.data.apellido : '', Validators.required],
      telefono: [this.data ? this.data.telefono : ''],
      dni: [this.data ? this.data.dni : '', [Validators.required, Validators.min(4000000)]],
      cuit: [this.data ? this.data.cuit : '', [Validators.required, Validators.min(20000000000), Validators.max(99999999999)]]
    });
  }

  createOrUpdate() {
    if (this.choferForm.valid) {
      const chofer: Chofer = this.choferForm.value;
      chofer.id = this.data ? this.data.id : undefined;  // Asignar ID solo si se está actualizando

      if (this.data) {
        // Actualizar chofer existente
        this.choferService.update(chofer).subscribe({
          next: (res: any) => {
            Swal.fire('Éxito', 'Chofer actualizado con éxito', 'success');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            Swal.fire('Error', 'No se pudo actualizar el chofer', 'error');
          }
        });
      } else {
        // Crear nuevo chofer
        this.choferService.create(chofer).subscribe({
          next: (res: any) => {
            Swal.fire('Éxito', 'Chofer creado con éxito', 'success');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            Swal.fire('Error', 'No se pudo crear el chofer', 'error');
          }
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
