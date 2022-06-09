import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IGetProducts, IProduct } from '../type/shop.type';
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
  private totalProductsBS = new BehaviorSubject<number>(0);
  get products$() {
    return this.productsBS.asObservable();
  }
  get totalProducts$() {
    return this.totalProductsBS.asObservable();
  }
  getProducts({ page, size }: IGetProducts) {
    this.shopApiService.getProducts({ page, size }).subscribe(
      (data) => {
        this.productsBS.next(data.content);
        this.totalProductsBS.next(data.totalElements);
      },
      (err) => {
        this.toast.error('Fetching data error!');
      }
    );
  }
  getProductByPrice(start: number, end: number) {
    this.shopApiService.getProductByPrice(start, end).subscribe(
      (data) => {
        this.productsBS.next(data.content);
        this.totalProductsBS.next(data.totalElements);
      },
      (err) => {
        this.toast.error('Fetching data error!');
      }
    );
  }
}
