import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  API_URL = environment.serverUrl;

  constructor(private http: HttpClient) {}
  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/products/${id}`);
  }
  getProductFeedback(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/products/feedbacks?prodId=${id}`);
  }
  // saveReview(review: IProductReview): Observable<any> {
  //   return this.http.post(`${this.API_URL}/review`, review);
  // }
}
