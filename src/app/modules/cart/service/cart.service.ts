import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../type/cart.type';
import { CartApiService } from './cart-api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private cartApiService: CartApiService,
    private toast: ToastrService
  ) {}
  private cartProductsBS = new BehaviorSubject<IProduct[]>([]);
  private discount = new BehaviorSubject<number>(0);
  get cartProducts$() {
    return this.cartProductsBS.asObservable();
  }
  get voucher$() {
    return this.discount.asObservable();
  }
  set voucherBS(value: number) {
    this.discount.next(value);
  }
  getCartProducts() {
    this.cartApiService.getCartProducts().subscribe(
      (data) => {
        this.cartProductsBS.next(data);
      },
      (err) => {
        this.toast.error('Fetching data error!');
      }
    );
  }
  addProductToCart(product: IProduct) {
    this.cartApiService.addProductToCart(product).subscribe(
      (data) => {
        const cartProductList = this.cartProductsBS.getValue();
        this.cartProductsBS.next([...cartProductList, data]);
        this.toast.success(`Add product: ${product.name} successfully!`);
      },
      (err) => this.toast.error('Faild to add product!')
    );
  }
  removeProduct(product: IProduct) {
    this.cartApiService.removeProduct(product).subscribe(
      (data) => {
        this.toast.success(`Delete product: ${product.name} successfully!`);
        this.getCartProducts();
      },
      (err) => this.toast.error('Delete product error!')
    );
  }
  clearShoppingCart(products: IProduct[]) {
    products.map((product) => {
      this.cartApiService.removeProduct(product).subscribe();
    });
    this.getCartProducts();
  }
  updateProductInCart(product: IProduct) {
    this.cartApiService.updateProduct(product).subscribe();
  }
}
