import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chofer } from 'src/app/Models/Chofer';
import { ModalChoferComponent } from './modal-chofer/modal-chofer.component';
import { ChoferService } from '../services/chofer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.css']
})
export class ChoferesComponent implements OnInit, OnDestroy{

  subscription!: Subscription;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'telefono', 'dni', 'cuit', 'actions'];
  dataSource: any[] = [];

  constructor(
    private choferService: ChoferService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadChoferes();
  }

  loadChoferes() {
    this.subscription = this.choferService.obtenerChoferesPorTransportista().subscribe({
      next: (choferes: any) => {
        this.dataSource = choferes;
      },
      error: (error) => {
        console.error('Error al cargar los choferes:', error);
      }
    });
  }

  addNewChofer() {
    const dialogRef = this.dialog.open(ModalChoferComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadChoferes();
      }
    });
  }

  openEditModal(chofer: Chofer) {
    const dialogRef = this.dialog.open(ModalChoferComponent, {
      width: '350px',
      data: chofer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadChoferes();
      }
    });
  }
}
