import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeService } from '../services/me.service';
import { Transportista } from 'src/app/Models/Transportista';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  transportista_id: number | undefined;
  title = "";

  constructor(private router: Router, private route: ActivatedRoute, private meService: MeService) {
    this.route.params.subscribe(params => {
      this.transportista_id = params['id'];
    });

  }
  ngOnInit(): void {

    if (this.transportista_id) {
      this.meService.setIdTransportista(this.transportista_id);

    }


  }

  logout() {
    console.log('Logout');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
