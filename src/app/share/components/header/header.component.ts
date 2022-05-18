import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/modules/cart/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartProductsNumber!: number;
  pages = ['HOME', 'SHOP', 'PAGE', 'CONTACT', 'BLOG'];
  pathName = '';
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartProducts();
    this.pathName = window.location.pathname.split('/')[1];
    this.cartService.cartProducts$.subscribe((data) => {
      this.cartProductsNumber = data.length;
    });
  }
}
