import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart/service/cart.service';
import { IProduct } from '../cart/type/cart.type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(private cartService: CartService) {}
  cartProductList: IProduct[] = [];
  subTotal: number = 0;
  discount: number = 0;
  formContact: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    note: new FormControl(''),
    paymentMethod: new FormControl('check-payment'),
  });

  handleOrder() {
    console.log({ ...this.formContact.value, orders: this.cartProductList });
  }
  ngOnInit(): void {
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
