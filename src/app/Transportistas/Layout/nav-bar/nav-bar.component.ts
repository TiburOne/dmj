import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeService } from '../../services/me.service';
import { Transportista } from 'src/app/Models/Transportista';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  title: string = "";
  isHandset: boolean = false;
  sidenavOpened: boolean = false;
  private handsetSubscription!: Subscription;

  constructor(private meService: MeService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.meService.obtenerTransportista().subscribe({
      next: (t: Transportista) => {
        this.title = t.nombre;
      },
      error(err) {
        console.log(err);
      },
    });

    this.handsetSubscription = this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((state: BreakpointState) => {
        this.isHandset = state.matches;
        if (!this.isHandset) {
          this.sidenavOpened = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.handsetSubscription.unsubscribe();
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
