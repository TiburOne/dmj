import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CRUDService, SERVICE_CONFIG } from 'src/app/Admin/services/crud.service';
import { Acoplado } from 'src/app/Models/Acoplado';
import { ModalAcopladoComponent } from './modal-acoplado/modal-acoplado.component';
import { MeService } from '../services/me.service';

@Component({
  selector: 'app-acoplados',
  templateUrl: './acoplados.component.html',
  styleUrls: ['./acoplados.component.css'],
  providers:[
    CRUDService,{
      provide: SERVICE_CONFIG,
      useValue: {endpoint: 'acoplados'}
    }
  ]
})
export class AcopladosComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'dominio', 'tipo', 'actions'];
  dataSource: Acoplado[] = [];

  filters: string = "";

  subscripcion!: Subscription;
  filterData: Acoplado[] = [];

  constructor(
    private transportistaService : MeService,
    private crudService: CRUDService<Acoplado>,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    try {
      this.subscripcion = this.transportistaService.getAcoplados().subscribe({
        next: (data) => {
          console.log(data);
          this.dataSource = data;
          this.filterData = this.dataSource;
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

  applyFilters(): void {
    // Implementar lógica de filtros aquí
  }

  addNew() {
    const dialogRef = this.dialog.open(ModalAcopladoComponent, {
      data: null // No data needed for creation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData(); // Reload data if a new acoplado is added
      }
    });
  }

  openEditModal(acoplado: Acoplado) {
    const dialogRef = this.dialog.open(ModalAcopladoComponent, {
      data: acoplado // Pass the current acoplado to be edited
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData(); // Reload data if an acoplado is updated
      }
    });
  }
}
