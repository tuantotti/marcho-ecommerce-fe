import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/service/cart.service';
import { ProductService } from './service/product.service';
import { IProduct, IProductFeedback } from './type/product.type';

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
  id!: string;
  product!: IProduct;
  feedbackList!: IProductFeedback[];
  cartProducts!: IProduct[];
  formFeedback: FormGroup = new FormGroup({
    vote: new FormControl(4),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl(''),
  });
  productInfo: FormGroup = new FormGroup({
    colorNSize: new FormControl(),
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
  thumbnailImgList: string[] = [];

  handleRatingReview(rating: number) {
    return Number(rating.toString()[0]) % 5;
  }

  handleAddProduct() {
    console.log({
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      colorId: this.productInfo.get('colorNSize')!.value.colorId,
      sizeId: this.productInfo.get('colorNSize')!.value.sizeId,
      priceOut: this.product.priceOut,
    });
  }

  handleAddReview() {
    this.productService.saveProductFeedback({
      ...this.formFeedback.value,
      proId: this.id,
      createAt: Date.now(),
    });
  }

  getRandomTime() {
    return new Date();
  }
  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];

    this.productService.getProduct(this.id);
    this.productService.getProductFeedback(this.id);

    this.productService.product$.subscribe((data) => {
      this.product = data;
      let arr: any = [];
      this.product.colors?.map((color) => {
        arr = [...arr, ...color.urlImages.map((item) => item)];
      });
      this.thumbnailImgList = arr;
    });
    this.productService.productFeedback$.subscribe(
      (data) => ((this.feedbackList = data), console.log(data))
    );

    this.selectedSize = this.sizes[1];
  }
}
