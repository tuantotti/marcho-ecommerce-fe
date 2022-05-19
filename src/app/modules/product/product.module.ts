import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material/material.module';
import { PrimeModule } from 'app/core/prime/prime.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    FormsModule,
    CommonModule,
    ProductRoutingModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [],
})
export class ProductModule {}
