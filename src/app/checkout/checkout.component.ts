import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CheckoutComponent {
  constructor(private cartService: CartService) {
    // Limpiar el carrito después de la compra
    this.cartService.clearCart();
  }
}
