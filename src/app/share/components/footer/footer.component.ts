import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  pathName = '';
  constructor() {}

  ngOnInit(): void {
    this.pathName = window.location.pathname.split('/')[1];
  }
}
