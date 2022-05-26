import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  showPassword: boolean = false;
  formRegister: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9 ]{10}'),
    ]),
  });
  onSubmit() {
    if (this.formRegister.status === 'VALID') {
      console.log(this.formRegister.value);
      this.authService.register(this.formRegister.value);
    }
  }

  ngOnInit(): void {}
}
