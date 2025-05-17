// Componente de Alerta
// Este componente maneja la visualización de notificaciones en la aplicación
// Es un componente standalone que puede mostrar diferentes tipos de alertas (success, error, info, warning)
// Las alertas aparecen en la esquina superior derecha de la pantalla

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlertService, Alert } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AlertComponent implements OnInit, OnDestroy {
  // Propiedad que almacena la alerta actual
  alert: Alert | null = null;
  // Suscripción para manejar las alertas del servicio
  private subscription: Subscription | null = null;

  constructor(private alertService: AlertService) {}

  // Inicializa la suscripción a las alertas
  ngOnInit(): void {
    this.subscription = this.alertService.alert$.subscribe(alert => {
      this.alert = alert;
    });
  }

  // Limpia la suscripción al destruir el componente
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Método para cerrar manualmente la alerta
  closeAlert(): void {
    this.alertService.clear();
  }
} 