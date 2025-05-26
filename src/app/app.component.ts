import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Título de la aplicación
  title = 'proyecto';

  // Propiedad para controlar si el menú está colapsado
  menuCollapsed = false; // El menú no está colapsado por defecto

  // Método para alternar el estado del menú
  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }
}
