import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductManagementService } from '../../services/ProductManagementService/product-management.service';
import { IProduct } from '../../type/product-management.type';

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

  submitted!: boolean;
  statuses!: any[];
  uploadedFiles: any[] = [];
  constructor(
    private productService: ProductManagementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  openNew() {
    this.resetProduct();
    this.submitted = false;
    this.productDialog = true;
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
        this.resetProduct();
      },
    });
  }
  saveProduct() {
    this.submitted = true;
    if (this.product.name!.trim()) {
      if (this.product.id) {
        this.productService.editProduct(this.product);
      } else {
        this.productService.saveProduct(
          this.productService.generateProduct(this.product)
        );
      }

      this.productDialog = false;
      this.resetProduct();
    }
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
  openEditProductDialog(product: IProduct) {
    this.product = { ...product };
    this.productDialog = true;
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  handleFilterBlobal(event: Event) {
    this.productTable.filterGlobal(
      (event.target! as HTMLInputElement).value,
      'contains'
    );
  }
  resetProduct() {
    this.product = {
      categoryDto: {},
    };
  }
  ngOnInit(): void {
    this.productService.getProducts();
    this.productService.products$.subscribe((data) => (this.products = data));
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }
}
