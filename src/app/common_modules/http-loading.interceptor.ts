import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { SpinnerService } from './spinner.service';


@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinnerService.hide();
        return throwError(error);
      }),
      finalize(() => {
        this.spinnerService.hide(); // Asegurar que se oculta el spinner si la respuesta es muy rápida
      })
    );
  }
}
