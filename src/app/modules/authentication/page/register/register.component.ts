import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor() {}
  showPassword: boolean = false;
  formLogin: FormGroup = new FormGroup({
    userNameOrEmailAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    agree: new FormControl(false),
  });
  onSubmit() {
    console.log(this.formLogin.value);
  }

  ngOnInit(): void {}
}
