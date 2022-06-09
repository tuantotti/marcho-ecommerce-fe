import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetProducts, IProduct } from 'app/modules/shop/type/shop.type';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  ICategories,
  IColors,
  ISizes,
} from '../../type/product-management.type';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementApiService {
  API_URL = environment.serverUrl;

  constructor(private http: HttpClient) {}
  getProductsWithOrdersSmall() {
    return this.http
      .get<any>(`${this.API_URL}/assets/showcase/data/products-orders.json`)
      .toPromise()
      .then((res) => <IProduct[]>res.data)
      .then((data) => {
        return data;
      });
  }
  getProducts({ page, size }: IGetProducts): Observable<any> {
    return this.http.get(
      `${this.API_URL}/api/products?page=${page}&size=${size}`
    );
  }
  saveProduct(product: IProduct) {
    return this.http.post(`${this.API_URL}/product`, product);
  }
  editProduct(product: IProduct) {
    return this.http.put(`${this.API_URL}/product/${product.id}`, product);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.API_URL}/product/${id}`);
  }
  getCategories(): Observable<ICategories[]> {
    return this.http.get<ICategories[]>(`${this.API_URL}/api/categories`);
  }
  getSizes(): Observable<ISizes[]> {
    return this.http.get<ISizes[]>(`${this.API_URL}/api/sizes`);
  }
  getColors(): Observable<IColors[]> {
    return this.http.get<IColors[]>(`${this.API_URL}/api/colors`);
  }
}
