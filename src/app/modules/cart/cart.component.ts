import { Component, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';
import { IProduct } from './type/cart.type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  cartProductList: IProduct[] = [];
  formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  handleRemoveProduct(product: IProduct) {
    console.log(product);
    this.cartService.removeProduct(product);
  }
  handleIncreaseAmount(product: IProduct) {
    console.log({
      ...product,
      quantity: product.quantity!++,
    });
  }
  handleDecreaseAmount(product: IProduct) {
    if (product.quantity! > 1) {
      console.log({
        ...product,
        quantity: product.quantity!--,
      });
    }
  }

  ngOnInit(): void {
    this.cartService.cartProducts$.subscribe((data) => {
      this.cartProductList = data;
    });
  }
}
