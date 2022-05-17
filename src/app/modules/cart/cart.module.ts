import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from 'app/core/prime/prime.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

@NgModule({
  imports: [CartRoutingModule, ReactiveFormsModule, PrimeModule, CommonModule],
  declarations: [CartComponent],
  exports: [],
})
export class CartModule {}
