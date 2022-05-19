import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './service/product.service';
import { IProduct, IProductReview } from './type/product.type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private activeRouter: ActivatedRoute,
    private productService: ProductService
  ) {}
  id!: number;
  product!: IProduct;
  reviewList!: IProductReview[];
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    urlImage: new FormControl([]),
    name: new FormControl(),
    priceOut: new FormControl(),
    quantity: new FormControl(),
    color: new FormControl(),
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
    });
    this.productService.productReview$.subscribe((data) => {
      this.reviewList = data;
    });

    this.selectedSize = this.sizes[1];
  }
}
