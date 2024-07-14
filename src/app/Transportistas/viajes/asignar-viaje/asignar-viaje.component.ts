import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Transportista } from 'src/app/Models/Transportista';
import { ViajeComun } from 'src/app/Models/ViajeComun';
import { Camion } from 'src/app/Models/Camion';
import { Acoplado } from 'src/app/Models/Acoplado';
import { Chofer } from 'src/app/Models/Chofer';

import { MeService } from '../../services/me.service';
import { ViajeComunService } from 'src/app/Admin/services/viaje-comun.service';
import { EncryptionService } from '../../services/encryption.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-viaje',
  templateUrl: './asignar-viaje.component.html',
  styleUrls: ['./asignar-viaje.component.css']
})
export class AsignarViajeComponent implements OnInit {
  idTransportista!: number;
  idViaje!: number;
  camiones: Camion[] = [];
  acoplados: Acoplado[] = [];
  choferes: Chofer[] = [];
  viaje!: ViajeComun;
  asignarViajeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private meService: MeService,
    private viajeService: ViajeComunService,
    private encryptionService: EncryptionService
  ) {
    this.asignarViajeForm = this.fb.group({
      camion: ['', Validators.required],
      acoplado: ['', Validators.required],
      chofer: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encryptedTransportistaId = params['transportista'];
      const encryptedViajeId = params['viaje'];

      if (encryptedTransportistaId && encryptedViajeId) {
        this.idTransportista = +this.encryptionService.decrypt(encryptedTransportistaId);
        this.idViaje = +this.encryptionService.decrypt(encryptedViajeId);
        this.meService.setIdTransportista(this.idTransportista);
        this.loadTransportistaData();
        this.loadViajeData();
      } else {
        this.idTransportista = this.meService.getIdTransportista();
        if (this.idTransportista > 0) {
          this.route.params.subscribe(params => {
            this.idViaje = +params['id'];
            this.loadTransportistaData();
            this.loadViajeData();
          });
        } else {
          // Manejar el caso en que no haya transportista asignado
          Swal.fire('Error', 'No hay id de transportista asignado.', 'error');
          throw new Error("No hay id de transportista asignado.");
        }
      }
    });
  }

  loadTransportistaData(): void {
    this.meService.getCamiones().subscribe({
      next: camiones => {
        this.camiones = camiones;
      },
      error: error => {
        console.log(error);
        Swal.fire('Error', 'No se pudieron cargar los camiones.', 'error');
      }
    });
    this.meService.getAcoplados().subscribe({
      next: acoplados => {
        this.acoplados = acoplados;
      },
      error: error => {
        console.log(error);
        Swal.fire('Error', 'No se pudieron cargar los acoplados.', 'error');
      }
    });
    this.meService.getChoferes().subscribe({
      next: choferes => {
        this.choferes = choferes;
      },
      error: error => {
        console.log(error);
        Swal.fire('Error', 'No se pudieron cargar los choferes.', 'error');
      }
    });
  }

  loadViajeData(): void {
    this.viajeService.getViaje(this.idViaje).subscribe({
      next: viaje => {
        this.viaje = viaje;
      },
      error: error => {
        console.log(error);
        Swal.fire('Error', 'No se pudo cargar la información del viaje.', 'error');
      }
    });
  }

  asignarViaje(): void {
    if (this.asignarViajeForm.valid) {
      const { camion, acoplado, chofer } = this.asignarViajeForm.value;
      this.meService.asignarViaje(this.idViaje, this.idTransportista, camion, acoplado, chofer)
        .subscribe({
          next: response => {
            Swal.fire('Éxito', 'El viaje se ha asignado exitosamente.', 'success');
          },
          error: error => {
            console.log(error);
            const msg = error?.error?.message ? error.error.message : 'No se pudo asignar el viaje.';
            Swal.fire('Error', msg, 'error');
          }
        });
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos.', 'error');
    }
  }

  get camion() {
    return this.asignarViajeForm.get('camion');
  }

  get acoplado() {
    return this.asignarViajeForm.get('acoplado');
  }

  get chofer() {
    return this.asignarViajeForm.get('chofer');
  }
}
