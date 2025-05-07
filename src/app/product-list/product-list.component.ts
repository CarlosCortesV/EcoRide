import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { CurrencyConverterPipe } from '../currency-converter.pipe';
import { CartService } from '../cart.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CurrencyPipe, CurrencyConverterPipe]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  showEditModal = false;
  selectedProduct: Product | null = null;
  editForm: FormGroup;
  wheelPrice = 0;
  totalPrice = 0;

  wheelPrices = {
    standard: 0,
    premium: 50,
    racing: 100
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      wheelType: ['standard', Validators.required],
      color: ['#000000', Validators.required]
    });
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    
    // Suscribirse a los cambios del formulario para actualizar precios
    this.editForm.valueChanges.subscribe(values => {
      this.updatePrices(values.wheelType);
    });
  }

  openEditForm(product: Product) {
    this.selectedProduct = product;
    this.showEditModal = true;
    this.editForm.patchValue({
      wheelType: 'standard',
      color: '#000000'
    });
    this.updatePrices('standard');
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
      // Aquí puedes implementar la lógica para guardar los cambios
      console.log('Cambios guardados:', formValues);
      this.alertService.success('¡Cambios realizados correctamente!');
      this.closeEditForm();
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
