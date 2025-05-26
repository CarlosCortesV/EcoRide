import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';
import { Product } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  // Importaciones necesarias para el componente
  imports: [CommonModule, RouterModule, CurrencyPipe]
})
export class CartComponent implements OnInit, OnDestroy {
  // Array que almacena los items del carrito
  cartItems: Product[] = [];
  private subscription: Subscription;

  // Inyección del servicio del carrito
  constructor(private cartService: CartService) {
    this.subscription = this.cartService.getCartItemsObservable()
      .subscribe(items => {
        this.cartItems = items.map(item => ({
          ...item,
          imageUrl: item.imageUrl || 'assets/default-product.png' // Imagen por defecto si no hay URL
        }));
      });
  }

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    // Los items ya se cargan en el constructor a través del Observable
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Método para eliminar un producto del carrito
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  // Método para limpiar el carrito
  clearCart() {
    this.cartService.clearCart();
  }
}