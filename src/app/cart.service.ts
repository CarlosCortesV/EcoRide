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

  removeFromCart(productId: string) {
    const productToRemove = this.items.find(item => item.id === productId);
    if (productToRemove) {
      this.items = this.items.filter(item => item.id !== productId);
      this.saveItemsToStorage();
      this.alertService.info(`${productToRemove.name} ha sido eliminado del carrito`);
    }
  }

  removeOneFromCart(productId: string) {
    const idx = this.items.findIndex(item => item.id === productId);
    if (idx !== -1) {
      const [removed] = this.items.splice(idx, 1);
      this.saveItemsToStorage();
      this.alertService.info(`Se eliminó una unidad de ${removed.name}`);
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

  getTotalGrouped(): number {
    const grouped: { [key: string]: { price: number; quantity: number } } = {};
    for (const item of this.items) {
      if (grouped[item.id]) {
        grouped[item.id].quantity++;
      } else {
        grouped[item.id] = { price: item.price, quantity: 1 };
      }
    }
    return Object.values(grouped).reduce((total, prod) => total + prod.price * prod.quantity, 0);
  }
}