import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './service/cart.service';
import { IProduct } from './type/cart.type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  cartProductList: IProduct[] = [];
  subTotal: number = 0;
  discount: number = 0;
  voucher: string = '';
  formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  handleRemoveProduct(product: IProduct) {
    this.cartService.removeProduct(product);
  }
  handleIncreaseAmount(product: IProduct) {
    product.quantity!++;
    this.cartService.updateProductInCart(product);
  }
  handleDecreaseAmount(product: IProduct) {
    if (product.quantity! > 1) {
      product.quantity!--;
      this.cartService.updateProductInCart(product);
    }
  }
  handleClearShoppingCart() {
    this.cartService.clearShoppingCart(this.cartProductList);
  }

  handleApplyVoucher() {
    switch (this.voucher) {
      case 'FREE50': {
        this.cartService.voucherBS = 0.5;
        break;
      }
      case 'TET2022': {
        this.cartService.voucherBS = 0.3;
        break;
      }
      default: {
        this.toastr.error('Invalid coupon!');
        this.cartService.voucherBS = 0;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.cartService.voucherBS = 0;
    this.cartService.cartProducts$.subscribe((data) => {
      this.cartProductList = data;
      this.subTotal = this.cartProductList.reduce(
        (total, currentValue) =>
          total + currentValue.priceOut! * currentValue.quantity!,
        0
      );
    });
    this.cartService.voucher$.subscribe((data) => (this.discount = data));
  }
}
