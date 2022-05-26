import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guard/admin/admin.guard';
import { UserGuard } from './core/guard/user/user.guard';
import { ErrorPageComponent } from './modules/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('app/modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('app/modules/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('app/modules/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('app/modules/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('app/modules/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('app/modules/user/user.module').then((m) => m.UserModule),
    canActivate: [UserGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('app/modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
