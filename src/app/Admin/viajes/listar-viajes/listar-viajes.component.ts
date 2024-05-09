import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-viajes',
  templateUrl: './listar-viajes.component.html',
  styleUrls: ['./listar-viajes.component.css']
})
export class ListarViajesComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource: any[] = [];

  filters: any = {};

  subscripcion!: Subscription;

  constructor(){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }




}
