import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CurrencyConverterPipe } from './currency-converter.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert.service';

@NgModule({
  // Declaraciones de componentes
  declarations: [
    AppComponent
  ],
  // Importaciones de módulos y componentes
  imports: [
    BrowserModule,        // Módulo necesario para aplicaciones web
    AppRoutingModule,     // Módulo de rutas
    ReactiveFormsModule,  // Módulo para formularios reactivos
    RouterModule,         // Módulo para enrutamiento
    HomeComponent,        // Componente de inicio
    CartComponent,        // Componente del carrito
    ProductListComponent, // Componente de lista de productos
    ProductDetailComponent, // Componente de detalle de producto
    CheckoutComponent,    // Componente de checkout
    CurrencyConverterPipe,  // Pipe personalizado para conversión de moneda
    AlertComponent        // Componente de alerta
  ],
  providers: [
    provideClientHydration(),
    AlertService
  ],
  // Componente raíz de la aplicación
  bootstrap: [AppComponent]
})
export class AppModule { }
