import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CRUDService, SERVICE_CONFIG } from 'src/app/Admin/services/crud.service';
import { Acoplado } from 'src/app/Models/Acoplado';
import { TipoAcoplado } from 'src/app/Models/Tipo_Acoplado';  // Asegúrate de tener este modelo
import { MeService } from '../../services/me.service';
import { TipoAcopladoService } from 'src/app/Admin/services/tipo_acoplado.service';

@Component({
  selector: 'app-modal-acoplado',
  templateUrl: './modal-acoplado.component.html',
  styleUrls: ['./modal-acoplado.component.css'],
  providers:[
    CRUDService,{
      provide: SERVICE_CONFIG,
      useValue: {endpoint: 'acoplados'}
    }
  ]
})
export class ModalAcopladoComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false;
  tiposAcoplado: TipoAcoplado[] = [];

  constructor(
    private fb: FormBuilder,
    private crudService: CRUDService<Acoplado>,
    private tipoAcopladoService: TipoAcopladoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalAcopladoComponent>,
    private tService: MeService,
    @Inject(MAT_DIALOG_DATA) public data: Acoplado | null
  ) {
    this.form = this.fb.group({
      dominio: ['', Validators.required],
      id_tipo_acoplado: ['', Validators.required]
    });

    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
    }
  }

  ngOnInit(): void {
    this.loadTiposAcoplado();
  }

  loadTiposAcoplado(): void {
    this.tipoAcopladoService.obtenerTipos().subscribe({
      next: (res) => {
        this.tiposAcoplado = res;
      },
      error: (err) => {
        console.error('Error al cargar tipos de acoplado', err);
      }
    });
  }

  saveForm(): void {
    if (this.form.valid) {
      const a = this.form.value as Acoplado;
      a.id_transportista = this.tService.getIdTransportista();
      a.id = this.data?.id || 0;
      if (this.isEditMode) {
        this.crudService.update(a.id, a).subscribe({
          next: (res) => {
            console.log('Actualización exitosa', res);
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error al actualizar', err);
          }
        });
      } else {
        this.crudService.create(a).subscribe({
          next: (res) => {
            console.log('Creación exitosa', res);
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error creando', err);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
