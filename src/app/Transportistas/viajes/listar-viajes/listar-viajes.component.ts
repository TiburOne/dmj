import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ViajeComun } from 'src/app/Models/ViajeComun';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViajeComunService } from 'src/app/Admin/services/viaje-comun.service';
import { EncryptionService } from '../../services/encryption.service';
import { Router } from '@angular/router';
import { MeService } from '../../services/me.service';

@Component({
  selector: 'app-listar-viajes',
  templateUrl: './listar-viajes.component.html',
  styleUrls: ['./listar-viajes.component.css']
})
export class ListarViajesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'origen', 'destino', 'especie', 'estado', 'actions'];
  dataSource: ViajeComun[] = [];
  filterData: ViajeComun[] = [];

  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  subscripcion!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private meService: MeService,
    private viajeComunService: ViajeComunService,
    private encryptionService: EncryptionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }

  ngOnDestroy(): void {
    this.subscripcion?.unsubscribe();
  }

  loadData(page: number, pageSize: number) {
    try {
      this.subscripcion = this.viajeComunService.getPendientes(page + 1, pageSize).subscribe({
        next: (response: { data: ViajeComun[], total: number }) => {
          const { data, total } = response;
          this.dataSource = data;
          this.filterData = this.dataSource;
          this.totalItems = total;
        },
        error: (err: any) => {
          console.log('Error al cargar los datos:', err);
        }
      });
    } catch (error) {
      console.log('Error en el método loadData:', error);
      this.dataSource = [];
      this.filterData = [];
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  tomarViaje(viaje: ViajeComun) {
    const idTransportista = this.meService.getIdTransportista();
    if (idTransportista > 0) {
      const encryptedTransportistaId = this.encryptionService.encrypt(idTransportista.toString());
      const encryptedViajeId = this.encryptionService.encrypt(viaje.id.toString());
      this.router.navigate([`/transportista/${idTransportista}/asignar-viaje`], { queryParams: { transportista: encryptedTransportistaId, viaje: encryptedViajeId } });
    } else {
      // Manejar el caso en que no haya transportista asignado
      console.error("No hay id de transportista asignado.");
    }
  }
}
