import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/service/cart.service';
import { ShopService } from '../shop/services/shop.service';
import { IProduct } from '../shop/type/shop.type';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  responsiveOptions;
  constructor(
    private shopService: ShopService,
    private cartService: CartService,
    private toast: ToastrService
  ) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  products: IProduct[] = [];
  checked: boolean = false;
  cities!: City[];
  cartProducts: IProduct[] = [];

  selectedCity1!: City;
  loadMore() {}
  ngOnInit(): void {
    this.shopService.getProducts();

    this.shopService.products$.subscribe((data) => (this.products = data));
  }
}
