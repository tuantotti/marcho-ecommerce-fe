import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/service/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  userInformation = {
    name: '',
    surname: '',
    userName: '',
    emailAddress: '',
    avatarPath: '',
  };
  ngOnInit(): void {
    this.authService.getUserInfor();
    this.authService.userInfor$.subscribe(
      (data) => (this.userInformation = data)
    );
  }
}
