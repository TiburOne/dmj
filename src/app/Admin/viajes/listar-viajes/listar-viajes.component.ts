import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViajeComun } from 'src/app/Models/ViajeComun';
import { CRUDService, SERVICE_CONFIG } from '../../services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearViajesComponent } from '../crear-viajes/crear-viajes.component';
import { ViajeComunService } from '../../services/viaje-comun.service';
import { PageEvent } from '@angular/material/paginator';
import { EstadoViajes } from 'src/app/Models/EstadoViaje';
import { EstadoViajesService } from '../../services/estado_viajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-viajes',
  templateUrl: './listar-viajes.component.html',
  styleUrls: ['./listar-viajes.component.css'],
  providers: [
    CRUDService,
    {
      provide: SERVICE_CONFIG,
      useValue: { endpoint: 'viaje_comun' }
    }
  ],
})
export class ListarViajesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'origen', 'destino', 'especie', 'estado', 'actions'];
  dataSource: ViajeComun[] = [];

  filters: string = "" ;
  estados: EstadoViajes[] = [];
  selectedEstados: number[] = [];

  subscripcion!: Subscription;
  filterData: ViajeComun[] = [];

  total: number = 0;
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private crudService: CRUDService<ViajeComun>,
    private dialog: MatDialog,
    private viajeComunService: ViajeComunService,
    private estadoViajesService: EstadoViajesService
  ) {}

  ngOnInit(): void {
    this.loadEstados();
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  loadEstados(): void {
    this.estadoViajesService.obtenerEstados().subscribe({
      next: estados => {
        this.estados = estados;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  loadData(): void {
    try {
      this.subscripcion = this.viajeComunService.listarViajes(this.page, this.pageSize, this.selectedEstados).subscribe({
        next: (response: any) => {
          console.log(response);
          this.dataSource = response.data;
          this.filterData = this.dataSource;
          this.total = response.total;
        },
        error: (err) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
      this.dataSource = [];
      this.filterData = [];
    }
  }

  pageEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  applyFilters(): void {
    this.loadData();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(CrearViajesComponent, {
      width: '1200px',
      data: null // No data needed for creation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData(); // Reload data if a new location is added
      }
    });
  }

  openEditModal(ubicacion: ViajeComun): void {
    const dialogRef = this.dialog.open(CrearViajesComponent, {
      width: '1200px',
      data: ubicacion // Pass the current ubicacion to be edited
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData(); // Reload data if a location is updated
      }
    });
  }

  sendWhatsApp(element: ViajeComun): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres reenviar el mensaje de WhatsApp para este viaje?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reenviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.viajeComunService.reenviarMensajes(element.id).subscribe({
          next: response => {
            Swal.fire(
              'Reenviado',
              'El mensaje de WhatsApp ha sido reenviado exitosamente.',
              'success'
            );
          },
          error: err => {
            Swal.fire(
              'Error',
              'Hubo un error al reenviar el mensaje de WhatsApp.',
              'error'
            );
            console.error('Error al reenviar mensajes', err);
          }
        });
      }
    });
  }

}
