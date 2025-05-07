import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timeout?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert | null>();
  alert$ = this.alertSubject.asObservable();

  constructor() { }

  success(message: string, timeout = 3000) {
    this.show({ message, type: 'success', timeout });
  }

  error(message: string, timeout = 3000) {
    this.show({ message, type: 'error', timeout });
  }

  info(message: string, timeout = 3000) {
    this.show({ message, type: 'info', timeout });
  }

  warning(message: string, timeout = 3000) {
    this.show({ message, type: 'warning', timeout });
  }

  private show(alert: Alert) {
    this.alertSubject.next(alert);
    
    if (alert.timeout) {
      setTimeout(() => {
        this.clear();
      }, alert.timeout);
    }
  }

  clear() {
    this.alertSubject.next(null);
  }
} 