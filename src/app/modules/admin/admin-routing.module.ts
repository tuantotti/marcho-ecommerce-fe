import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './page/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './page/admin-login/admin-login.component';
import { ProductManagementComponent } from './page/product-management/product-management.component';
import { UserManagementComponent } from './page/user-management/user-management.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'login', component: AdminLoginComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'product-management', component: ProductManagementComponent },
      { path: 'user-management', component: UserManagementComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
