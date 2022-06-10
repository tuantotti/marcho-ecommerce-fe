import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import {
  IColors as IColorsProduct,
  IProduct,
} from 'app/modules/product/type/product.type';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
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
  detailRow!: IDetailRow[];
  fd = new FormData();
  colorListOfProduct: IColors[] = [];
  colorUploadImg!: IColorsProduct;
  detailDataRow = new BehaviorSubject<any[]>([]);

  get detailDataRow$() {
    return this.detailDataRow.asObservable();
  }
  set detailDataRowBS(value: any) {
    this.detailDataRow.next(value);
  }
  constructor(
    private productService: ProductManagementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  paginate(event: any) {
    this.productService.getProducts({ page: event.page + 1, size: 6 });
  }
  handleOpenEditProductDialog(product: IProduct) {
    this.productService.getProductDetail(product.id!);

    // this.productService.currentProduct = product;
    // this.product.thumbnail.map((thumbnail) => {
    //   thumbnail.urlImages.map((item) => {
    //     this.productImg.push(item);
    //   });
    // });
    this.productDialog = true;
  }
  handleOpenAddProductDialog() {
    this.productDialog = true;
  }
  handleCloseDialog() {
    this.productImg = [];
    this.productService.currentProduct = {} as IProduct;
    this.productDialog = false;
  }
  handleAddColorAndSize() {
    const newArr = [
      ...this.detailDataRow.getValue(),
      {
        color: {} as IColors,
        size: {} as ISizes,
        quantity: 0,
        multipartFiles: [],
      },
    ];
    // const newArr = [
    //   ...this.detailRow,
    //   {
    //     color: {} as IColors,
    //     size: {} as ISizes,
    //     quantity: 0,
    //     multipartFiles: [],
    //   },
    // ];
    // this.detailRow = newArr;
    this.detailDataRowBS = newArr;

    console.log(this.detailDataRow.getValue());
  }
  handleDeleteColorAndSize(value: IDetailRow) {
    const newArr = this.detailDataRow
      .getValue()
      .filter((item: IDetailRow) => item !== value);
    this.detailDataRowBS = newArr;
    // const newArr = this.detailRow.filter((item: IDetailRow) => item !== value);
    // this.detailRow = newArr;
  }
  handleLog() {
    // console.log(this.detailRow);
    console.log(this.detailDataRow.getValue());
    console.log(this.product);
    console.log(this.colorUploadImg);
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

  handleUploadImg(originalEvent: any, files: any, currentFiles: any) {
    currentFiles.currentFiles.map((file: File) => {
      this.fd.append('image', file, file.name);
    });
    let list: File[] = [];
    for (var pair of this.fd.entries()) {
      list = [...list, pair[1] as File];
    }
    const value = (this.detailDataRow.getValue()[
      this.detailDataRow.getValue().length - 1
    ].multipartFiles = this.fd);
    this.detailDataRowBS = value;
    // this.detailRow[this.detailRow.length - 1].multipartFiles = this.fd;

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  handleRemoveImg(originalEvent: any, file: any) {
    // Update formData when remove img
    let list: File[] = [];
    for (var pair of this.fd.entries()) {
      list = [...list, pair[1] as File];
    }
    list = list.filter((item) => item.name !== file.file.name);
    this.fd = new FormData();
    list.map((file: File) => {
      this.fd.append('image', file, file.name);
    });
    console.log(list);
  }
  handleFilterBlobal(event: Event) {
    this.productTable.filterGlobal(
      (event.target! as HTMLInputElement).value,
      'contains'
    );
  }

  handleChangeCategory(event: MatRadioChange) {
    this.product.category = event.value;
    console.log(this.product);
  }

  ngOnInit(): void {
    this.productService.getProducts({ page: 0, size: 6 });
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
      let arr: any = [];
      this.product.colors?.map((item) => {
        item.sizes?.map((s) => {
          arr = [
            ...arr,
            {
              color: item.color,
              size: s.size,
              quantity: s.quantity,
              multipartFiles: item.urlImages,
            },
          ];
        });
      });
      this.detailDataRowBS = arr;
      // this.detailRow = arr;
    });

    this.detailDataRow$.subscribe((data) => {
      console.log(data);
      this.detailRow = data;
      this.colorListOfProduct = Array.from(
        new Set(this.detailDataRow.getValue().map((item) => item.color))
      );
      console.log(this.colorListOfProduct);
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }
}
