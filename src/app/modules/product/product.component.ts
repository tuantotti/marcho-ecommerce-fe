import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/service/cart.service';
import { ProductService } from './service/product.service';
import { IProductReview } from './type/product.type';
import { IProduct } from '../cart/type/cart.type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private activeRouter: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
  id!: number;
  product!: IProduct;
  reviewList!: IProductReview[];
  cartProducts!: IProduct[];
  productForm: FormGroup = new FormGroup({
    urlImage: new FormControl([]),
    name: new FormControl(),
    priceOut: new FormControl(),
    color: new FormControl(),
    size: new FormControl(),
  });
  formReview: FormGroup = new FormGroup({
    rating: new FormControl(4),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl(''),
  });
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  selectedSize: any = null;
  sizes: any[] = [
    { name: 'M', key: 'M' },
    { name: 'L', key: 'L' },
    { name: 'XL', key: 'XL' },
    { name: 'XXL', key: 'XXL' },
  ];
  handleRatingReview(rating: number) {
    return Number(rating.toString()[0]) % 5;
  }

  handleAddProduct() {
    const isValidationProduct = Object.values(this.productForm.value).every(
      (value) => value
    );
    if (!this.productForm.get('color')!.value) {
      this.toastr.error('Please select product color!');
    } else if (!this.productForm.get('size')!.value) {
      this.toastr.error('Please select product size!');
    }
    if (isValidationProduct) {
      let isAlready = false;

      this.cartProducts.map((item) => {
        const idAlready = item.id;
        delete item.id;
        this.productForm.value.quantity = item.quantity;
        if (JSON.stringify(item) === JSON.stringify(this.productForm.value)) {
          isAlready = true;
          item.quantity!++;
          this.cartService.updateProductInCart({ id: idAlready, ...item });
          this.toastr.success(
            `Update product: ${item.name}, Size: ${item.size}, Color: ${item.color} successfully!`
          );
        }
      });
      if (!isAlready) {
        this.cartService.addProductToCart({
          ...this.productForm.value,
          quantity: 1,
        });
      }
    }
  }

  onSubmit() {
    this.productService.saveReview({
      postId: this.id,
      createdAt: new Date(),
      ...this.formReview.value,
    });
    this.formReview.reset();
  }

  ngOnInit(): void {
    this.id = Number(this.activeRouter.snapshot.params['id']);

    this.productService.getProduct(this.id);
    this.productService.getProductReview(this.id);

    this.productService.product$.subscribe((data) => {
      this.product = data;
      this.productForm.patchValue({
        name: data?.name,
        priceOut: data?.priceOut,
        urlImage: data?.urlImage,
      });
    });
    this.cartService.cartProducts$.subscribe(
      (data) => (this.cartProducts = data)
    );
    this.productService.productReview$.subscribe(
      (data) => (this.reviewList = data)
    );

    this.selectedSize = this.sizes[1];
  }
}
