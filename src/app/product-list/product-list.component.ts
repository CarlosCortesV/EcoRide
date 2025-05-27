import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CurrencyPipe]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  showEditModal = false;
  selectedProduct: Product | null = null;
  editForm: FormGroup;
  wheelPrice = 0;
  totalPrice = 0;
  loading = false;
  error = '';

  wheelPrices = {
    standard: 0,
    premium: 50,
    racing: 100
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      wheelType: ['standard', Validators.required],
      color: ['#000000', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    
    this.editForm.valueChanges.subscribe(values => {
      this.updatePrices(values.wheelType);
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  openEditForm(product: Product) {
    this.selectedProduct = product;
    this.showEditModal = true;
    this.editForm.patchValue({
      wheelType: product.wheelType || 'standard',
      color: product.color || '#000000'
    });
    this.updatePrices(product.wheelType || 'standard');
  }

  closeEditForm() {
    this.showEditModal = false;
    this.selectedProduct = null;
  }

  updatePrices(wheelType: string) {
    this.wheelPrice = this.wheelPrices[wheelType as keyof typeof this.wheelPrices];
    this.totalPrice = (this.selectedProduct?.price || 0) + this.wheelPrice;
  }

  onSubmit() {
    if (this.editForm.valid && this.selectedProduct) {
      const formValues = this.editForm.value;
      const updatedProduct: Product = {
        ...this.selectedProduct,
        price: this.totalPrice,
        wheelType: formValues.wheelType,
        color: formValues.color
      };
      
      this.productService.updateProduct(this.selectedProduct.id, updatedProduct).subscribe({
        next: (response) => {
          // Actualizar el producto en la lista local
          const index = this.products.findIndex(p => p.id === this.selectedProduct?.id);
          if (index !== -1) {
            this.products[index] = response;
          }
          window.alert('¡Cambios guardados exitosamente!');
          this.closeEditForm();
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
          window.alert('Error al guardar los cambios. Por favor, intenta de nuevo.');
        }
      });
    }
  }
}
