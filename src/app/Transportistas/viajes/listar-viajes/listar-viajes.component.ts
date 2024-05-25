import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ViajeComun } from 'src/app/Models/ViajeComun';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViajeComunService } from 'src/app/Admin/services/viaje-comun.service';

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

  constructor(private viajeComunService: ViajeComunService) {}

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
}
