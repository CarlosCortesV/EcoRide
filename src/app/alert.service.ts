// Servicio de Alerta
// Este servicio maneja la lógica de las notificaciones en la aplicación
// Proporciona métodos para mostrar diferentes tipos de alertas con duración configurable

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Interfaz que define la estructura de una alerta
export interface Alert {
  message: string;      // Mensaje a mostrar
  type: 'success' | 'error' | 'info' | 'warning';  // Tipo de alerta
  timeout?: number;     // Duración en milisegundos (opcional)
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // Subject para manejar las alertas de forma reactiva
  private alertSubject = new Subject<Alert | null>();
  // Observable público para que los componentes puedan suscribirse
  alert$ = this.alertSubject.asObservable();

  constructor() { }

  // Muestra una alerta de éxito (verde)
  success(message: string, timeout = 3000) {
    this.show({ message, type: 'success', timeout });
  }

  // Muestra una alerta de error (rojo)
  error(message: string, timeout = 3000) {
    this.show({ message, type: 'error', timeout });
  }

  // Muestra una alerta informativa (azul)
  info(message: string, timeout = 3000) {
    this.show({ message, type: 'info', timeout });
  }

  // Muestra una alerta de advertencia (amarillo)
  warning(message: string, timeout = 3000) {
    this.show({ message, type: 'warning', timeout });
  }

  // Método privado para mostrar una alerta
  private show(alert: Alert) {
    this.alertSubject.next(alert);
    
    // Si se especifica un timeout, limpia la alerta después de ese tiempo
    if (alert.timeout) {
      setTimeout(() => {
        this.clear();
      }, alert.timeout);
    }
  }

  // Limpia la alerta actual
  clear() {
    this.alertSubject.next(null);
  }
} 