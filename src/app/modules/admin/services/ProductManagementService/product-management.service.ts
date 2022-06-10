import { Injectable } from '@angular/core';
import { IProduct } from 'app/modules/product/type/product.type';
import { IGetProducts } from 'app/modules/shop/type/shop.type';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import {
  ICategories,
  IColors,
  ISizes,
} from '../../type/product-management.type';
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
  private currentProductBS = new BehaviorSubject<IProduct>({
    colors: [{}],
    category: {},
  } as IProduct);
  private totalProductsBS = new BehaviorSubject<number>(0);
  private categoriesBS = new BehaviorSubject<ICategories[]>([]);
  private colorsBS = new BehaviorSubject<IColors[]>([]);
  private sizesBS = new BehaviorSubject<ISizes[]>([]);
  get products$() {
    return this.productsBS.asObservable();
  }
  get totalProducts$() {
    return this.totalProductsBS.asObservable();
  }
  get categories$() {
    return this.categoriesBS.asObservable();
  }
  get colors$() {
    return this.colorsBS.asObservable();
  }
  get sizes$() {
    return this.sizesBS.asObservable();
  }
  get currentProduct$() {
    return this.currentProductBS.asObservable();
  }
  set currentProduct(value: IProduct) {
    this.currentProductBS.next(value);
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
  getProductDetail(id: string) {
    this.productManagementApiService.getProductDetail(id).subscribe((data) => {
      this.currentProductBS.next(data);
    });
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
  getCategories() {
    this.productManagementApiService.getCategories().subscribe((data) => {
      this.categoriesBS.next(data);
    });
  }
  getSizes() {
    this.productManagementApiService.getSizes().subscribe((data) => {
      this.sizesBS.next(data);
    });
  }
  getColors() {
    this.productManagementApiService.getColors().subscribe((data) => {
      this.colorsBS.next(data);
    });
  }
}
