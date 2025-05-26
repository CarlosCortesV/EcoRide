import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Product } from './product.service';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'cart_items';
  private items: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  private isBrowser: boolean;

  constructor(
    private alertService: AlertService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadItemsFromStorage();
  }

  private loadItemsFromStorage() {
    if (this.isBrowser) {
      const storedItems = localStorage.getItem(this.CART_STORAGE_KEY);
      if (storedItems) {
        this.items = JSON.parse(storedItems);
        this.cartItemsSubject.next(this.items);
      }
    }
  }

  private saveItemsToStorage() {
    if (this.isBrowser) {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.items));
    }
    this.cartItemsSubject.next(this.items);
  }

  getItems(): Product[] {
    return this.items;
  }

  getCartItemsObservable() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.saveItemsToStorage();
    this.alertService.success(`${product.name} se ha movido al carrito`);
  }

  removeFromCart(productId: number) {
    const productToRemove = this.items.find(item => item.id === productId);
    if (productToRemove) {
      this.items = this.items.filter(item => item.id !== productId);
      this.saveItemsToStorage();
      this.alertService.info(`${productToRemove.name} ha sido eliminado del carrito`);
    }
  }

  clearCart() {
    this.items = [];
    this.saveItemsToStorage();
    this.alertService.info('El carrito ha sido vaciado');
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}