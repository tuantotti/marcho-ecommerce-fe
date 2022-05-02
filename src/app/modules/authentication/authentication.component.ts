import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  pages = ['LOGIN', 'REGISTER'];
  activePage = this.pages[0];
  constructor() {}

  ngOnInit(): void {}
}
