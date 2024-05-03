import { Component } from '@angular/core';

@Component({
  selector: 'app-acoplados',
  templateUrl: './acoplados.component.html',
  styleUrls: ['./acoplados.component.css']
})

export class AcopladosComponent {
  displayedColumns: string[] = ['id', 'dominio', 'tipo'];
  dataSource: any[] = [];

}
