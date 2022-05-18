import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from 'app/modules/authentication/service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  canActivate(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.log('login');
      this.router.navigate(['/admin/login']);
      return false;
    }
    return true;
  }
}
