import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor() {}
  isShowNotify = false;
  isShowComment = false;
  items!: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        items: [
          { label: 'Classic', icon: 'pi pi-plus' },
          { label: 'Minimal', icon: 'pi pi-external-link' },
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Delete', icon: 'pi pi-trash' },
          { label: 'Refresh', icon: 'pi pi-refresh' },
        ],
      },
      {
        label: 'Help',
        items: [
          {
            label: 'Contents',
            icon: 'pi pi-pi pi-bars',
          },
          {
            label: 'Search',
            icon: 'pi pi-pi pi-search',
          },
        ],
      },
      {
        label: 'Actions',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Other',
            icon: 'pi pi-tags',
          },
        ],
      },
    ];
  }
}
