import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  // Importaciones necesarias para el componente
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class CheckoutComponent implements OnInit {
  // Formulario reactivo para los datos de pago
  checkoutForm: FormGroup;
  // Variable para controlar si el pago fue exitoso
  paymentSuccess = false;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    // Inicialización del formulario reactivo
    this.checkoutForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      ciudad: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      fechaVencimiento: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  ngOnInit() {
    // Verificar si hay items en el carrito
    if (this.cartService.getItems().length === 0) {
      // Redirigir al carrito si está vacío
      // Aquí deberías implementar la redirección
    }
  }

  // Método para procesar el pago
  onSubmit() {
    if (this.checkoutForm.valid) {
      // Aquí iría la lógica de procesamiento del pago
      console.log('Datos del formulario:', this.checkoutForm.value);
      
      // Simular procesamiento exitoso
      this.paymentSuccess = true;
      
      // Limpiar el carrito después del pago exitoso
      this.cartService.clearCart();
    }
  }

  // Método para obtener el total del carrito
  getTotal(): number {
    return this.cartService.getTotal();
  }
}
