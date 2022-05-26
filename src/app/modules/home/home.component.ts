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
  responsiveOptionsBanner;
  responsiveOptionsTrending;
  days: number = 28;
  hours: number = 8;
  minitues: number = 58;
  seconds: number = 10;
  timeInterval!: number;
  constructor(private shopService: ShopService) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
    this.responsiveOptionsBanner = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.responsiveOptionsTrending = [
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
  banner: string[] = [
    './assets/img/banner-1.jpeg',
    './assets/img/banner-2.jpeg',
    './assets/img/banner-3.jpeg',
    './assets/img/banner-4.jpeg',
  ];
  checked: boolean = false;
  cities!: City[];
  cartProducts: IProduct[] = [];

  selectedCity1!: City;
  loadMore() {}
  ngOnInit(): void {
    this.shopService.getProducts({ page: 0, size: 10 });

    this.shopService.products$.subscribe((data) => (this.products = data));

    this.timeInterval = window.setInterval(() => {
      this.seconds--;
    }, 1000);
  }
  ngDoCheck(): void {
    if (this.seconds == 0) {
      this.seconds = 60;
      this.minitues--;
    }
    if (this.minitues == 0) {
      this.minitues = 60;
      this.hours--;
    }
    if (this.hours == 0) {
      this.hours = 24;
      this.days--;
    }
    if (this.days == 0) {
      this.seconds = 0;
      this.minitues = 0;
      this.hours = 0;
      clearInterval(this.timeInterval);
    }
  }
}
