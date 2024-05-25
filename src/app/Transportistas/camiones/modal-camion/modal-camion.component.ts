import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CRUDService, SERVICE_CONFIG } from 'src/app/Admin/services/crud.service';
import { Camion } from 'src/app/Models/Camion';
import { MeService } from '../../services/me.service';

@Component({
  selector: 'app-modal-camion',
  templateUrl: './modal-camion.component.html',
  styleUrls: ['./modal-camion.component.css'],
  providers:[
    CRUDService,{
      provide: SERVICE_CONFIG,
      useValue: {endpoint: 'camiones'}
    }
  ]
})
export class ModalCamionComponent {
  form: FormGroup;
  isEditMode: boolean = false;


  constructor(
    private fb: FormBuilder,
    private crudService: CRUDService<Camion>,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalCamionComponent>,
    private tService: MeService,
    @Inject(MAT_DIALOG_DATA) public data: Camion | null
  ){
    this.form = this.fb.group({
      dominio: ['', Validators.required]
    });

    if(this.data){
      this.isEditMode = true;
      this.form.patchValue(this.data);
    }

  }

  saveForm(){
    if(this.form.valid){
      const c = this.form.value as Camion;
      c.id_transportista = this.tService.getIdTransportista();
      c.id = this.data?.id || 0;
      if(this.isEditMode){
        this.crudService.update(c.id, c).subscribe({
          next: (res) => {
            console.log('Actualizacion exitosa ', res);
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.log('Error al actualizar ', err);

          }
        });
      }else{
        this.crudService.create(c).subscribe({
          next: (res) => {
            console.log('Creacion exitosa ', res);
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error creando', err);
          }
        });
      }
    }
    else{

    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
