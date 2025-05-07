import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { CurrencyConverterPipe } from '../currency-converter.pipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  // Importaciones necesarias para el componente
  imports: [CommonModule, RouterModule, CurrencyPipe, CurrencyConverterPipe]
})
export class CartComponent implements OnInit {
  // Array que almacena los items del carrito
  cartItems: any[] = [];

  // Inyección del servicio del carrito
  constructor(private cartService: CartService) {}

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    // Obtiene los items del carrito del servicio
    this.cartItems = this.cartService.getItems();
  }

  // Método para limpiar el carrito
  clearCart() {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getItems();
  }
}