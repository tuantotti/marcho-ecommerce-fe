import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IGetProducts, IProduct } from '../type/shop.type';

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  API_URL = environment.serverUrl;

  constructor(private http: HttpClient) {}
  getProducts({ page, size }: IGetProducts): Observable<any> {
    return this.http.get(
      `${this.API_URL}/api/products?page=${page}&size=${size}`
    );
  }
  getCartProducts(): Observable<any> {
    return this.http.get(`${this.API_URL}/cart`);
  }
}
