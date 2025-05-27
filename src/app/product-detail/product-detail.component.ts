import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'], // Usar archivo CSS externo
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe]
})
export class ProductDetailComponent implements OnInit {

  product: Product | undefined;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (product: Product) => {
          this.product = product;
          this.loading = false;
        },
        error: (error: Error) => {
          this.error = 'Error al cargar el producto. Por favor, intenta de nuevo más tarde.';
          console.error('Error fetching product:', error);
          this.loading = false;
        }
      });
    } else {
      this.error = 'ID de producto no válido';
      this.loading = false;
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    window.alert('Producto agregado al carrito!');
  }
}


