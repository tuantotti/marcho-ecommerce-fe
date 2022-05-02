import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material/material.module';
import { PrimeModule } from 'app/core/prime/prime.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './page/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './page/admin-login/admin-login.component';

@NgModule({
  declarations: [AdminLoginComponent, AdminDashboardComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    PrimeModule,
  ],
})
export class AdminModule {}
