import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  constructor(private alertService: AlertService) { }

  getItems(): Product[] {
    return this.items;
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.alertService.success(`${product.name} se ha movido al carrito`);
  }

  removeFromCart(productId: number) {
    const productToRemove = this.items.find(item => item.id === productId);
    this.items = this.items.filter(item => item.id !== productId);
    if (productToRemove) {
      this.alertService.info(`${productToRemove.name} ha sido eliminado del carrito`);
    }
  }

  clearCart() {
    this.items = [];
    this.alertService.info('El carrito ha sido vaciado');
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}