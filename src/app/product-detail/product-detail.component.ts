import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
        } else {
          this.error = 'Producto no encontrado';
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 3000);
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el producto. Por favor, intenta de nuevo más tarde.';
        console.error('Error fetching product:', error);
        this.loading = false;
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Producto agregado al carrito!');
  }
}


