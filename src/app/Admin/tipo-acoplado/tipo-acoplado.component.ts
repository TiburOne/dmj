import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TipoAcopladoService } from '../services/tipo_acoplado.service';
import { MatDialog } from '@angular/material/dialog';
import { TipoAcoplado } from 'src/app/Models/Tipo_Acoplado';
import Swal from 'sweetalert2';
import { ModalTipoAcopladoComponent } from './modal-tipo-acoplado/modal-tipo-acoplado.component';
import { Acoplado } from 'src/app/Models/Acoplado';

@Component({
  selector: 'app-tipo-acoplado',
  templateUrl: './tipo-acoplado.component.html',
  styleUrls: ['./tipo-acoplado.component.css']
})
export class TipoAcopladoComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['id', 'tipo', 'cantidad_ejes', 'actions'];
  dataSource: TipoAcoplado[] = [];

  filters: any = {};

  subscripcion!: Subscription;

  constructor(private tipoAcopladoService: TipoAcopladoService, private dialog: MatDialog) {

  }

  ngOnDestroy(): void {
    this.subscripcion?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadTipoAcoplados();
  }

  loadTipoAcoplados() {
    try {
      this.subscripcion = this.tipoAcopladoService.obtenerTipos().subscribe({
        next: (tipos: any) => {
          console.log(tipos);
          this.dataSource = tipos;
        },
        error: (error) => {
          console.error('Error loading tipos:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudieron cargar los datos!'
          });
          this.dataSource = [];
        }
      });

    } catch (error) {
      console.error('Catch block error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error inesperado!'
      });
      this.dataSource = [];
    }
  }

  openEditModal(acoplado: Acoplado) {
    const dialogRef = this.dialog.open(ModalTipoAcopladoComponent, {
      width: '350px',
      data: {
       ...acoplado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadTipoAcoplados(); // Solo recargar  si se actualizó
      }
    });
  }
  add_new_tipo_acoplado() {
     // Lógica para abrir un modal de formulario o navegar a una página de creación
     console.log('Agregar nuevo tipo de acoplado');

     const dialogRef = this.dialog.open(ModalTipoAcopladoComponent, {
       width: '350px',

     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
       if (result === true) {
         this.loadTipoAcoplados(); // Solo  los especies si se creo alguna
       }
     });
  }
  applyFilters() {
    throw new Error('Method not implemented.');
  }

}
