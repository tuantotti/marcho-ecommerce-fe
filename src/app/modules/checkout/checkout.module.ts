import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material/material.module';
import { PrimeModule } from 'app/core/prime/prime.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  imports: [
    CheckoutRoutingModule,
    ReactiveFormsModule,
    PrimeModule,
    CommonModule,
    MaterialModule,
  ],
  declarations: [CheckoutComponent],
  exports: [],
})
export class CheckoutModule {}
