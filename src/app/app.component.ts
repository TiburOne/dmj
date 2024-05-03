import { Component } from '@angular/core';
import { SpinnerService } from './common_modules/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  constructor(public spinnerService: SpinnerService) {}
}
