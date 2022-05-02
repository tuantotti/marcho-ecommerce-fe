import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from 'app/core/prime/prime.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [FormsModule, CommonModule, HomeRoutingModule, PrimeModule],
  exports: [],
})
export class HomeModule {}
