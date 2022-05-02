import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/modules/authentication/service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  showPassword: boolean = false;
  formLogin: FormGroup = new FormGroup({
    userNameOrEmailAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });
  onSubmit() {
    console.log(this.formLogin.get('userNameOrEmailAddress'));
    if (this.formLogin.status === 'VALID') {
      this.authService.logIn(this.formLogin.value);
    }
  }
  ngOnInit(): void {}
}
