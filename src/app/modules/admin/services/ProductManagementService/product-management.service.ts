import { Injectable } from '@angular/core';
import { IGetProducts, IProduct } from 'app/modules/shop/type/shop.type';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ProductManagementApiService } from './product-management-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  constructor(
    private productManagementApiService: ProductManagementApiService,
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
    this.productManagementApiService.getProducts({ page, size }).subscribe(
      (data) => {
        this.productsBS.next(data.content);
        this.totalProductsBS.next(data.totalElements);
      },
      (err) => {
        this.toast.error('Fetching data error!');
      }
    );
  }
  saveProduct(product: IProduct) {
    this.productManagementApiService.saveProduct(product).subscribe(
      (data) => {
        this.toast.success('Product created successfully!');
        this.getProducts({ page: 1, size: 6 });
      },
      (err) => {
        this.toast.error('Product created error!');
      }
    );
  }
  editProduct(product: IProduct) {
    this.productManagementApiService.editProduct(product).subscribe(
      (data) => {
        this.toast.success('Product editted successfully!');
        this.getProducts({ page: 1, size: 6 });
      },
      (err) => {
        this.toast.success('Product editted error!');
      }
    );
  }
  deleteProduct(id: string) {
    this.productManagementApiService.deleteProduct(id).subscribe(
      (data) => {
        this.toast.success('Product deleted successfully!');
        this.getProducts({ page: 1, size: 6 });
      },
      (err) => {
        this.toast.success('Product deleted error!');
      }
    );
  }
  deleteSelectedProducts(selectedProducts: IProduct[]) {
    selectedProducts.map((product) => {
      this.productManagementApiService.deleteProduct(product.id!).subscribe(
        (data) => {
          this.getProducts({ page: 1, size: 6 });
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
