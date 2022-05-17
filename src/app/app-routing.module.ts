import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './core/guard/user/user.guard';

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
    path: 'user',
    loadChildren: () =>
      import('app/modules/user/user.module').then((m) => m.UserModule),
    canActivate: [UserGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('app/modules/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
