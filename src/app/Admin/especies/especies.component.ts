import { Component, OnDestroy, OnInit } from '@angular/core';
import { EspecieService } from '../services/especie.service';
import { ModalEspecieComponent } from './modal-especie/modal-especie.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.css']
})
export class EspeciesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource: any[] = [];

  filters: any = {};

  subscripcion!: Subscription;

  constructor(private espcieService: EspecieService, private dialog: MatDialog) {

  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
  ngOnInit(): void {
    this.loadEspecies();
  }

  loadEspecies() {
    try {
      this.subscripcion =  this.espcieService.obtenerEspecies().subscribe({
        next: (especies: any) => {
          console.log(especies);
          this.dataSource = especies;
        },
        error: (error) => {
          console.log(error);
          //TODO: Agregar mensaje de error con sweetalert2
          this.dataSource = [];
        }
      });

    } catch (error) {
      //TODO: Agregar mensaje de error con sweetalert2
      this.dataSource = [];
    }
  }

  applyFilters(): void {
    //TODO: Aplicar filtros al datasource, usar un arreglo intermedio para no perder los datos
    //this.loadEspecies();
  }

  addNewSpecies() {
    // Lógica para abrir un modal de formulario o navegar a una página de creación
    console.log('Agregar nueva especie');

    const dialogRef = this.dialog.open(ModalEspecieComponent, {
      width: '350px',

    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.loadEspecies(); // Solo  los especies si se creo alguna
      }
    });
  }

  openEditModal(especie: any) {

    const dialogRef = this.dialog.open(ModalEspecieComponent, {
      width: '350px',
      data: {
        id: especie.id,
        nombre: especie.nombre
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadEspecies(); // Solo recargar  si se actualizó
      }
    });

  }

}
