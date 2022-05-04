import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from './type/shop.type';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { ShopService } from './services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('productTable') dataView!: DataView;
  constructor(private shopService: ShopService) {}
  products!: IProduct[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;
  sortKey!: any;
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  handleFilterByName(event: Event) {
    this.dataView.filter((event.target! as HTMLInputElement).value);
  }
  ngOnInit(): void {
    this.shopService.getProducts();

    this.shopService.products$.subscribe((data) => (this.products = data));
  }
}
