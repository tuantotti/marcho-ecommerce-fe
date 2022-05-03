import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { HeaderComponent } from '../header/header.component';
// import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor() // private api: ApiService
  {}

  productList: any = [];
  subTotal: number = 0;
  @Output() changeAmout: EventEmitter<any> = new EventEmitter();
  couponCodeValue: number = 0;
  isApplyCouponCode: boolean = false;
  formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  loadProductData(): void {
    // this.subTotal = 0;
    // this.api.getCartProduct().subscribe((res) => {
    //   this.productList = res;
    //   this.productList.map((item: any) => {
    //     this.subTotal! += item.quantity * item.price.new;
    //   });
    // });
  }
  increaseQuantity(productId: any, product: any) {
    // this.subTotal = 0;
    // product.quantity++;
    // this.productList.map((p: any) => {
    //   if (p.id === productId) {
    //     this.api.update(productId, p).subscribe();
    //   }
    //   this.subTotal! += p.quantity * p.price.new;
    //   console.log(
    //     'id' +
    //       p.id +
    //       ', quantity' +
    //       p.quantity +
    //       ', price' +
    //       p.price.new +
    //       ', total: ' +
    //       p.quantity * p.price.new
    //   );
    // });
  }

  decreaseQuantity(productId: any, product: any) {
    // if (product.quantity == 1) {
    //   $('.pop-up-' + productId).css('display', 'flex');
    // } else {
    //   this.subTotal = 0;
    //   product.quantity--;
    //   this.productList.map((p: any) => {
    //     if (p.id === productId) {
    //       this.api.update(productId, p).subscribe();
    //     }
    //     this.subTotal! += p.quantity * p.price.new;
    //   });
    // }
  }

  removeProduct(productId: any) {
    // this.api.removeProduct(productId).subscribe((res) => {
    //   this.loadProductData();
    //   this.api.updateCartItem();
    //   this.api.getCartItem();
    // });
  }

  popupRemoveProduct(pId: any) {
    // $('.pop-up').css('display', 'none');
    // console.log('popup delete id: ' + pId);
    // this.api.removeProduct(pId).subscribe((res) => {
    //   this.loadProductData();
    //   this.api.updateCartItem();
    //   this.api.getCartItem();
    // });
  }

  applyCounponCode() {
    // if ($('.coupon-code__input').val() == 'FREE50') {
    //   this.isApplyCouponCode = true;
    //   this.couponCodeValue = 0.5;
    //   $('.text-append').remove();
    //   $('.coupon-code__input')
    //     .parent()
    //     .append(
    //       `<span class="text-append">Coupon code: <span  style="color: red">${$(
    //         '.coupon-code__input'
    //       ).val()}</span> is apply!</span>`
    //     );
    // } else if ($('.coupon-code__input').val() == 'TET2022') {
    //   this.isApplyCouponCode = true;
    //   this.couponCodeValue = 0.3;
    //   $('.text-append').remove();
    //   $('.coupon-code__input')
    //     .parent()
    //     .append(
    //       `<span class="text-append">Coupon code: <span  style="color: red">${$(
    //         '.coupon-code__input'
    //       ).val()}</span> is apply!</span>`
    //     );
    // } else {
    //   // if ($('.text-append').index() == -1) {
    //   this.isApplyCouponCode = false;
    //   this.couponCodeValue = 0;
    //   $('.text-append').remove();
    //   $('.coupon-code__input')
    //     .parent()
    //     .append(
    //       '<span class="text-append" style="color: red">Your coupon code is wrong!</span>'
    //     );
    //   // }
    // }
    // this.api.setCouponCode(this.couponCodeValue);
    // $('.coupon-code__input').val('');
  }

  clearShoppingCart() {
    // this.api.getCartProduct().subscribe((res) => {
    //   this.productList = res;
    //   this.productList.map((product: any) => {
    //     this.removeProduct(product.id);
    //   });
    // });
  }
  hidePopUp() {
    // $('.pop-up').css('display', 'none');
  }
  ngOnInit(): void {
    // $(window).scrollTop(0);
    // this.loadProductData();
    // $('.coupon-code__input').on('input', (e) => {
    //   console.log(e.target);
    // });
  }
}
