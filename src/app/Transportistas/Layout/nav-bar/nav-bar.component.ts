import { Component, OnInit } from '@angular/core';
import { MeService } from '../../services/me.service';
import { Transportista } from 'src/app/Models/Transportista';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  title: string ="";

  constructor(private meService: MeService){

  }
  ngOnInit(): void {
    this.meService.obtenerTransportista().subscribe({
      next: (t: Transportista) => {
        this.title = t.nombre;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
