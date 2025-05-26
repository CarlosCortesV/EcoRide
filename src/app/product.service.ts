import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  wheelType?: string;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  private products: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => {
        this.products = products;
        return products;
      }),
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return of([]);
      })
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al obtener producto con id ${id}:`, error);
        return of(undefined);
      })
    );
  }

  updateProduct(id: number, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, updatedProduct).pipe(
      catchError(error => {
        console.error(`Error al actualizar producto con id ${id}:`, error);
        throw error;
      })
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError(error => {
        console.error('Error al crear producto:', error);
        throw error;
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al eliminar producto con id ${id}:`, error);
        throw error;
      })
    );
  }
}