import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { ICategories, IColors } from '../admin/type/product-management.type';
import { CartService } from '../cart/service/cart.service';
import { ProductManagementService } from './../admin/services/ProductManagementService/product-management.service';
import { ShopService } from './services/shop.service';
import { IProduct } from './type/shop.type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private productManagementService: ProductManagementService,
    private cartService: CartService,
    private toast: ToastrService
  ) {}

  products!: IProduct[];
  totalProducts: number = 0;
  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;
  sortKey!: string;
  rangeValues: number[] = [20, 80];
  priceUnit: number = 100000;
  colorFilterList: IColors[] = [];
  categoryFilterList: ICategories[] = [];
  handleSortByOrder(event: any) {
    console.log(event.value);
  }
  handleFilterByName(event: Event) {
    const name = (event.target! as HTMLInputElement).value;
    console.log(name);
  }
  handleFilterByPrice() {
    const start = this.rangeValues[0] * this.priceUnit;
    const end = this.rangeValues[1] * this.priceUnit;
    this.shopService.getProductByPrice(start, end);
  }
  handleFilterByColors(event: MatRadioChange) {
    console.log(event.value);
  }
  handleFilterByCategories(event: MatRadioChange) {
    console.log(event.value);
  }
  paginate(event: any) {
    this.shopService.getProducts({ page: event.page, size: 6 });
  }
  ngOnInit(): void {
    this.productManagementService.getColors();
    this.productManagementService.getCategories();

    combineLatest(
      this.productManagementService.colors$,
      this.productManagementService.categories$
    ).subscribe((data) => {
      (this.colorFilterList = data[0]), (this.categoryFilterList = data[1]);
    });

    this.sortOptions = [
      { label: 'Price Low to High', value: 'asc' },
      { label: 'Price High to Low', value: 'desc' },
    ];
    this.shopService.getProducts({ page: 0, size: 6 });

    this.shopService.products$.subscribe((data) => (this.products = data));
    this.shopService.totalProducts$.subscribe(
      (data) => (this.totalProducts = data)
    );
  }
}
