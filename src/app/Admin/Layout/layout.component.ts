import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/socket.service';
import { MatDialog } from '@angular/material/dialog';
import { QrDisplayComponent } from '../qr-display/qr-display.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, private socketService: WebSocketService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.socketService.getQRCode().subscribe({
      next: (str:string)=>{
        this.openQRDialog(str);
      }
    });
  }

  logout() {
    console.log('Logout');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  openQRDialog(qrCode: string): void {
    const dialogRef = this.dialog.open(QrDisplayComponent, {
      width: '300px',
      data: { qrCode: qrCode }  // Asegúrate de manejar el dato en QrDisplayComponent
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The QR dialog was closed');
    });
  }
}
