import { Component } from '@angular/core';
import { TransportistaService } from '../services/transportista.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalTransportistaComponent } from './modal-transportista/modal-transportista.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transportistas-lista',
  templateUrl: './transportistas-lista.component.html',
  styleUrls: ['./transportistas-lista.component.css']
})
export class TransportistasListaComponent {
  displayedColumns: string[] = ['id', 'nombre', 'cuit', 'email', 'telefono', 'actions'];
  dataSource: any[] = [];

  constructor(private transportistaService: TransportistaService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadTransportistas();
  }

  loadTransportistas() {
    this.transportistaService.obtenerTransportistas().subscribe({
      next: (transportistas: any) => {
        this.dataSource = transportistas;
      },
      error: (error) => {
        console.error('Error al cargar los transportistas:', error);
      }
    });
  }

  addNewTransportista() {
    const dialogRef = this.dialog.open(ModalTransportistaComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadTransportistas();
      }
    });
  }

  openEditModal(transportista: any) {
    const dialogRef = this.dialog.open(ModalTransportistaComponent, {
      width: '350px',
      data: transportista
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadTransportistas();
      }
    });
  }

  openTransportista(t: any){
    //TODO: preguntar si quiere entrar al modo transportista y de aceptar ir a la pagina de transportista '/transportista/:id' (t.id)

    console.log(t);
    this.router.navigate(['/transportista', t.id]);
  }
}
