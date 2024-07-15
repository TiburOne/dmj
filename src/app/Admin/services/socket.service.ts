import { Inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { API_URLS, AppSetings } from '../app-setting/app-config.token';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket?: Socket;

  constructor(@Inject(API_URLS) private Urls: AppSetings) {

    this.connect();

  }

  private connect(): void {
    // Inicializa el socket aquí con configuración por defecto
    this.socket = io(this.Urls.socketUrl, {
      reconnectionAttempts: 5,  // Número de intentos de reconexión
      reconnectionDelay: 3000,   // Tiempo de espera entre reconexiones
    });

    // Evento de conexión
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Evento de reconexión
    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`Reconnected to WebSocket server on attempt ${attemptNumber}`);
    });

    // Evento de desconexión
    this.socket.on('disconnect', (reason) => {
      console.log(`Disconnected from WebSocket server due to ${reason}`);
      if (reason === 'io server disconnect') {
        if (this.socket) this.socket.connect();
      }
    });

    // Evento de error de conexión
    this.socket.on('connect_error', (err) => {
      console.error('Connection to WebSocket server failed:', err);
    });
  }

  public getQRCode(): Observable<string> {
    return new Observable(observer => {
      if (this.socket) this.socket.on('qr', (qr) => {
        observer.next(qr);
      });
    });
  }
}
