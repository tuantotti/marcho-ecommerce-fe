import { Injectable } from '@angular/core';
import { IProductReview } from 'app/modules/product/type/product.type';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../type/shop.type';
import { ShopApiService } from './shop-api.service';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(
    private shopApiService: ShopApiService,
    private toast: ToastrService
  ) {}
  private productsBS = new BehaviorSubject<IProduct[]>([]);
  private cartProductsBS = new BehaviorSubject<IProduct[]>([]);
  get products$() {
    return this.productsBS.asObservable();
  }
  get cartProducts$() {
    return this.cartProductsBS.asObservable();
  }
  getProducts() {
    this.shopApiService.getProducts().subscribe(
      (data) => {
        this.productsBS.next(data);
      },
      (err) => {
        this.toast.error('Fetching data error!');
      }
    );
  }
  getCartProducts() {
    this.shopApiService.getCartProducts().subscribe(
      (data) => {
        this.cartProductsBS.next(data);
      },
      (err) => {
        this.toast.error('Fetching data error!');
      }
    );
  }
}
