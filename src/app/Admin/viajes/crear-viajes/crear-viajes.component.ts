import { Component, Inject } from '@angular/core';
import { CRUDService, SERVICE_CONFIG } from '../../services/crud.service';
import { ViajeComun } from 'src/app/Models/ViajeComun';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UbicacionesComponent } from '../../search/ubicaciones/ubicaciones.component';
import { Ubicacion } from 'src/app/Models/Ubicacion';
import { Especie } from 'src/app/Models/Especie';
import { EspecieService } from '../../services/especie.service';
import { HttpClient } from '@angular/common/http';
import { TipoAcoplado } from 'src/app/Models/Tipo_Acoplado';
import { AppSetings } from '../../app-setting/app-config.token';
import { TipoAcopladoService } from '../../services/tipo_acoplado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-viajes',
  templateUrl: './crear-viajes.component.html',
  styleUrls: ['./crear-viajes.component.css'],
  providers: [
    CRUDService,
    {
      provide: SERVICE_CONFIG,
      useValue: { endpoint: 'viaje_comun' }
    }
  ],
})
export class CrearViajesComponent {
  form: FormGroup;
  isEditMode: boolean = false;
  ubicacionOrigen: Ubicacion | null = null;
  ubicacionDestino: Ubicacion | null = null;
  especies: Especie[] = [];
  tipoAcoplados: TipoAcoplado[] = [];

  constructor(
    private fb: FormBuilder,
    private crudService: CRUDService<ViajeComun>,
    private serviceEspecie: EspecieService,
    private tipoAcopladoService: TipoAcopladoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CrearViajesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViajeComun | null
  ) {
    this.form = this.fb.group({
      idUbicacionOrigen: ['', Validators.required],
      idUbicacionDestino: ['', Validators.required],
      idEspecie: ['', Validators.required],
      tipoTarifa: ['Por Tonelada', Validators.required],
      idEstado: ['1', Validators.required],
      idTipoAcoplado: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      valor_tarifa: [null, [Validators.required, Validators.min(0)]],
    });

    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
      this.form.controls['tipoTarifa'].setValue(this.data.tipo_tarifa || 'Por Tonelada');
      this.form.controls['idTipoAcoplado'].setValue(this.data.TiposAcoplados || []);
    }
  }

  ngOnInit(): void {
    // Puedes cargar información adicional aquí si es necesario
    this.cargarEspecies();
    this.cargarTiposAcoplados();
  }

  saveForm(): void {
    if (this.form.valid) {
      const viajeComunDetails = this.form.value as ViajeComun;
      if (this.isEditMode) {
        this.crudService.update(this.data!.id, viajeComunDetails).subscribe({
          next: (res) => {
            console.log('Actualización exitosa', res);
            this.dialogRef.close(true);
          },
          error: (err) => console.error('Error actualizando', err)
        });
      } else {
        this.crudService.create(viajeComunDetails).subscribe({
          next: (res) => {
            console.log('Creación exitosa', res);
            this.dialogRef.close(true);
          },
          error: (err) => console.error('Error creando', err)
        });
      }
    } else {
      console.error('Formulario no es válido');
    }
  }

  cargarEspecies() {
    this.serviceEspecie.obtenerEspecies().subscribe({
      next: (especies) => {
        this.especies = especies;
      },
      error: (error) => {
        console.error('Error al cargar las especies:', error);
      }
    });
  }
  cargarTiposAcoplados() {
    this.tipoAcopladoService.obtenerTipos().subscribe({
      next: (tipos) => {
        this.tipoAcoplados = tipos;
      },
      error: (error) => {
        console.error('Error al cargar las especies:', error);
      }
    });
  }

  openUbicacionModal(isOrigin: boolean): void {
    const dialogRef = this.dialog.open(UbicacionesComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isOrigin) {
          this.ubicacionOrigen = result;
          this.form.patchValue({ idUbicacionOrigen: result.id });
        } else {
          this.ubicacionDestino = result;
          this.form.patchValue({ idUbicacionDestino: result.id });
        }
      }
    });
  }

  closeForm(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Formulario Enviado:', this.form.value);
    if (this.form.valid) {
      console.log('Formulario Enviado:', this.form.value);
      const v = new ViajeComun(this.form.value);

      this.crudService.create(v).subscribe({
        next: (viaje) => {
          console.log('Viaje creado:', viaje);
          Swal.fire({
            title: 'Éxito',
            text: 'Viaje creado con éxito',
            icon: 'success'
          });
          this.dialogRef.close(viaje);
        },
        error: (error) => {
          console.error('Error al crear el viaje:', error);
        }
      });

    } else {
      console.log('Formulario no es válido');
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
    }
  }
}
