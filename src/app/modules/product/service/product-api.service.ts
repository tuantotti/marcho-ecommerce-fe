import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IProductReview } from '../type/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  API_URL = environment.serverUrl;

  constructor(private http: HttpClient) {}
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/product/${id}`);
  }
  getProductReview(): Observable<any> {
    return this.http.get(`${this.API_URL}/review/`);
  }
  saveReview(review: IProductReview): Observable<any> {
    return this.http.post(`${this.API_URL}/review`, review);
  }
}
