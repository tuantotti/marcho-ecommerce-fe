import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { IProduct } from '../../type/product-management.type';

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
  getProducts(): Observable<any> {
    return this.http.get(`${this.API_URL}/product`);
  }
  saveProduct(product: IProduct): Observable<IProduct> {
    return this.http.post(`${this.API_URL}/product`, product);
  }
  editProduct(product: IProduct): Observable<IProduct> {
    return this.http.put(`${this.API_URL}/product/${product.id}`, product);
  }
  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete(`${this.API_URL}/product/${id}`);
  }
}
