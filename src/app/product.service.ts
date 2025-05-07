import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Patineta EcoRide 1', description: 'Descripción del producto 1', price: 299.99, imageUrl: 'assets/product1.webp' },
    { id: 2, name: 'Patineta EcoRide 2', description: 'Descripción del producto 2', price: 399.99, imageUrl: 'assets/product2.png' },
    { id: 3, name: 'Patineta EcoRide 3', description: 'Descripción del producto 3', price: 499.99, imageUrl: 'assets/product3.webp' }
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}