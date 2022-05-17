import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IProduct, IProductReview } from '../type/product.type';
import { ProductApiService } from './product-api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_URL = environment.serverUrl;
  constructor(
    private productApiService: ProductApiService,
    private toastr: ToastrService
  ) {}
  private productBS = new BehaviorSubject<IProduct>({} as IProduct);
  private productReviewBS = new BehaviorSubject<IProductReview[]>([]);
  get product$() {
    return this.productBS.asObservable();
  }
  get productReview$() {
    return this.productReviewBS.asObservable();
  }
  getProduct(id: number) {
    this.productApiService
      .getProduct(id)
      .subscribe((data) => this.productBS.next(data));
  }
  getProductReview(id: number) {
    this.productApiService.getProductReview().subscribe((data) => {
      const reviewList = data.filter((item: any) => item.postId === id);
      this.productReviewBS.next(reviewList);
    });
  }
  saveReview(review: IProductReview) {
    this.productApiService.saveReview(review).subscribe(
      (data) => {
        this.toastr.success('Sent review successfully!');
        this.getProductReview(review.postId);
      },
      (err) => {
        this.toastr.error('Sent review error!');
      }
    );
  }
}
