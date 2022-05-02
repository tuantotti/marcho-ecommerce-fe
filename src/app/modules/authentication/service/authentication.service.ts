import { Injectable } from '@angular/core';
import { ILoginRequest } from '../type/authentication.type';
import { AuthenticationApiService } from './authentication-api.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private authApiService: AuthenticationApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  accessToken = new BehaviorSubject<string | null>(
    localStorage.getItem('accessToken')
  );
  private userInfor = new BehaviorSubject({
    name: '',
    surname: '',
    userName: '',
    emailAddress: '',
    avatarPath: '',
  });

  get accessToken$() {
    return this.accessToken.asObservable();
  }
  get userInfor$() {
    return this.userInfor.asObservable();
  }
  logIn(data: ILoginRequest) {
    return this.authApiService.logIn(data).subscribe(
      (data) => {
        localStorage.setItem('accessToken', data.result.accessToken);
        this.accessToken.next(data.result.accessToken);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.toastr.error(
          `${err.error.error.message}\n${err.error.error.details}!`
        );
      }
    );
  }
  loggedIn() {
    return !!localStorage.getItem('accessToken');
  }
  getUserInfor() {
    this.authApiService.getUserInfor().subscribe((data) => {
      this.userInfor.next({
        name: data.result.user.name,
        surname: data.result.user.surname,
        userName: data.result.user.userName,
        emailAddress: data.result.user.emailAddress,
        avatarPath: data.result.user.avatarPath,
      });
    });
  }
}
