import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [`
/* Estilos del detalle de producto */
app-product-detail .product-detail {
  background: var(--neutral-50); /* Fondo claro */
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg); /* Sombra más pronunciada */
  overflow: hidden;
  margin: var(--spacing-8) auto; /* Centrar y aumentar margen */
  max-width: 1000px; /* Limitar ancho máximo */
  display: grid;
  grid-template-columns: 1fr 1.2fr; /* Ajustar proporción de columnas */
  gap: var(--spacing-12); /* Aumentar espacio entre columnas */
  align-items: start; /* Alinear elementos al inicio */
  padding: var(--spacing-8); /* Añadir padding interno */
}

app-product-detail .product-image-container {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg); /* Bordes redondeados para el contenedor de imagen */
}

app-product-detail .product-image {
  width: 100%;
  height: auto; /* Altura automática para mantener proporción */
  object-fit: contain; /* Cambiado de cover a contain */
  display: block; /* Eliminar espacio extra debajo de la imagen */
  transition: transform 0.3s ease;
}

app-product-detail .product-image:hover {
  transform: scale(1.03); /* Ligeramente menos zoom al pasar el ratón */
}

app-product-detail .product-info {
  padding: 0; /* Eliminar padding aquí si ya está en .product-detail */
  display: flex;
  flex-direction: column;
}

app-product-detail .product-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--neutral-900);
  margin-bottom: var(--spacing-4);
}

app-product-detail .product-price {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--primary-600);
  margin-bottom: var(--spacing-6);
}

app-product-detail .product-description {
  color: var(--neutral-600);
  font-size: var(--text-base);
  line-height: 1.6;
  margin-bottom: var(--spacing-6);
}

app-product-detail .product-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

app-product-detail .meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--neutral-600);
  font-size: var(--text-sm);
}

app-product-detail .meta-item i {
  color: var(--primary-500);
}

app-product-detail .quantity-selector {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

app-product-detail .quantity-btn {
  width: 40px;
  height: 40px;
  border: 2px solid var(--primary-500);
  background: transparent;
  color: var(--primary-600);
  border-radius: var(--radius-lg);
  font-size: var(--text-xl);
  cursor: pointer;
  transition: all 0.2s ease;
}

app-product-detail .quantity-btn:hover {
  background: var(--primary-50);
}

app-product-detail .quantity-input {
  width: 60px;
  text-align: center;
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  border: none;
  background: transparent;
}

app-product-detail .product-actions {
  display: flex;
  gap: var(--spacing-4);
  margin-top: auto;
}

app-product-detail .btn-add-cart {
  flex: 1;
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--text-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

app-product-detail .btn-add-cart:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

app-product-detail .btn-wishlist {
  width: 50px;
  height: 50px;
  border: 2px solid var(--primary-500);
  background: transparent;
  color: var(--primary-600);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

app-product-detail .btn-wishlist:hover {
  background: var(--primary-50);
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 1024px) {
  app-product-detail .product-detail {
    grid-template-columns: 1fr; /* Una columna en pantallas medianas */
    gap: var(--spacing-8);
    padding: var(--spacing-6);
  }

  app-product-detail .product-image-container {
    height: auto; /* Altura automática */
  }

  app-product-detail .product-image {
    height: 300px; /* Altura fija en pantallas medianas si es necesario */
    object-fit: cover;
  }
}

@media (max-width: 768px) {
  app-product-detail .product-detail {
    margin: var(--spacing-4);
    padding: var(--spacing-4);
  }

  app-product-detail .product-info {
    padding: 0;
  }

  app-product-detail .product-image {
    height: 250px; /* Ajustar altura en pantallas pequeñas */
  }

  app-product-detail .product-title {
    font-size: var(--text-2xl);
  }

  app-product-detail .product-price {
    font-size: var(--text-3xl);
  }

  app-product-detail .product-meta {
    grid-template-columns: 1fr;
  }

  app-product-detail .product-actions {
    flex-direction: column;
  }

  app-product-detail .btn-wishlist {
    width: 100%;
  }
}

app-product-detail .back-button-container {
  margin-bottom: var(--spacing-6);
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0 var(--spacing-8); /* Añadir padding horizontal */
}

app-product-detail .back-btn {
  background-color: var(--neutral-400);
  color: var(--neutral-900);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  border: none; /* Eliminar borde */
  padding: var(--spacing-3) var(--spacing-4); /* Ajustar padding */
  border-radius: var(--radius-md); /* Bordes redondeados */
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none; /* Eliminar subrayado */
  font-size: var(--text-base);
}

app-product-detail .back-btn:hover {
  background-color: var(--neutral-500);
  color: var(--neutral-50);
}

/* Mensajes de carga y error */
app-product-detail .loading-container,
app-product-detail .error-container {
  text-align: center;
  font-size: var(--text-lg);
  color: var(--neutral-700);
  margin-top: var(--spacing-12);
}

app-product-detail .error-container {
  color: var(--accent-700); /* Usar color de acento para errores */
}
  `],
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


