import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  total = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      expiryDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')]],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]]
    });
  }

  ngOnInit(): void {
    this.total = this.cartService.getTotal();
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      // Aquí procesarías el pago
      this.alertService.success('¡Pago realizado con éxito!');
      this.cartService.clearCart();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } else {
      this.alertService.error('Por favor completa todos los campos correctamente');
    }
  }
}
