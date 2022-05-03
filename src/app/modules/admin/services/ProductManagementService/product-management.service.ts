import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../../type/product-management.type';
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
  get products$() {
    return this.productsBS.asObservable();
  }
  getProducts() {
    this.productManagementApiService.getProducts().subscribe(
      (data) => {
        this.productsBS.next(data);
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
        this.getProducts();
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
        this.getProducts();
      },
      (err) => {
        this.toast.success('Product editted error!');
      }
    );
  }
  deleteProduct(id: number) {
    this.productManagementApiService.deleteProduct(id).subscribe(
      (data) => {
        this.toast.success('Product deleted successfully!');
        this.getProducts();
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
          this.getProducts();
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  generateProduct(product: IProduct): IProduct {
    const productGeneration: IProduct = {
      ...product,
      code: this.generateCode(9),
    };

    // productGeneration.urlImage =
    //   productGeneration.name!.toLocaleLowerCase().split(/[ ,]+/).join('-') +
    //   '.jpg';
    productGeneration.urlImage = 'product-placeholder.svg';

    return productGeneration;
  }
  generateCode(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
