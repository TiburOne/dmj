import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-display',
  template: `<div *ngIf="data.qrCode"><img [src]="data.qrCode" alt="QR Code"></div>`,
  styleUrls: ['./qr-display.component.css']
})
export class QrDisplayComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){

  }
}
