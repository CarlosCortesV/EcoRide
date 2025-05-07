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

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductListComponent,
    ProductDetailComponent,
    CheckoutComponent,
    CurrencyConverterPipe,
    AlertComponent
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: []
})
export class AppModule { }
