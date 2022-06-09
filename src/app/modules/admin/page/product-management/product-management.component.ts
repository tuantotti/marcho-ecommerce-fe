import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from 'app/modules/shop/type/shop.type';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { combineLatest } from 'rxjs';
import {
  ICategories,
  IColors,
  IDetailRow,
  ISizes,
} from '../../type/product-management.type';
import { ProductManagementService } from './../../services/ProductManagementService/product-management.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  @ViewChild('productTable') productTable!: Table;
  productDialog!: boolean;
  products!: IProduct[];
  product!: IProduct;
  selectedProducts?: IProduct[] | null;
  statuses!: any[];
  uploadedFiles: any[] = [];
  productImg: string[] = [];
  totalProducts: number = 0;
  categories: ICategories[] = [];
  colors: IColors[] = [];
  sizes: ISizes[] = [];
  detailRow: IDetailRow[] = [
    {
      color: {} as IColors,
      size: {} as ISizes,
      quantity: 0,
    },
    {
      color: {} as IColors,
      size: {} as ISizes,
      quantity: 0,
    },
    {
      color: {} as IColors,
      size: {} as ISizes,
      quantity: 0,
    },
  ];
  constructor(
    private productService: ProductManagementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  paginate(event: any) {
    this.productService.getProducts({ page: event.page + 1, size: 6 });
  }
  handleOpenEditProductDialog(product: IProduct) {
    console.log(product);
    this.productService.currentProduct = product;
    this.product.thumbnail.map((thumbnail) => {
      thumbnail.urlImages.map((item) => {
        this.productImg.push(item);
      });
    });
    this.productDialog = true;
  }
  handleOpenAddProductDialog() {
    this.productDialog = true;
  }
  handleCloseDialog() {
    this.productImg = [];
    this.productService.currentProduct = {
      thumbnail: [{}],
      category: {},
    } as IProduct;
    this.productDialog = false;
  }
  handleAddColorAndSize() {
    const newArr = [
      ...this.detailRow,
      {
        color: {} as IColors,
        size: {} as ISizes,
        quantity: NaN,
      },
    ];
    this.detailRow = newArr;
  }
  handleDeleteColorAndSize(value: IDetailRow) {
    const newArr = this.detailRow.filter((item: IDetailRow) => item !== value);
    this.detailRow = newArr;
  }
  handleLog() {
    this.detailRow.map((item: IDetailRow) => {
      console.log(
        'call api: ' +
          item.color.colorName +
          ', ' +
          item.size.name +
          ', ' +
          item.quantity
      );
    });
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteSelectedProducts(
          this.selectedProducts as IProduct[]
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }
  deleteProduct(product: IProduct) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete product: "' + product.name + '"?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id!);
      },
    });
  }
  saveProduct() {
    // this.submitted = true;
    // if (this.product.name!.trim()) {
    //   if (this.product.id) {
    //     this.productService.editProduct(this.product);
    //   } else {
    //     this.productService.saveProduct(
    //       this.productService.generateProduct(this.product)
    //     );
    //   }
    //   this.productDialog = false;
    //   this.resetProduct();
    // }
  }
  onUpload(event: any) {
    console.log(event);
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
  handleFilterBlobal(event: Event) {
    this.productTable.filterGlobal(
      (event.target! as HTMLInputElement).value,
      'contains'
    );
  }

  ngOnInit(): void {
    this.productService.getProducts({ page: 1, size: 6 });
    this.productService.getCategories();
    this.productService.getColors();
    this.productService.getSizes();

    combineLatest([
      this.productService.products$,
      this.productService.totalProducts$,
      this.productService.categories$,
      this.productService.colors$,
      this.productService.sizes$,
      this.productService.currentProduct$,
    ]).subscribe((data) => {
      this.products = data[0];
      this.totalProducts = data[1];
      this.categories = data[2];
      this.colors = data[3];
      this.sizes = data[4];
      this.product = data[5];
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }
}
