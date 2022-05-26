import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from 'app/modules/authentication/service/authentication.service';

enum ERole {
  ROLE_ADMIN,
  ROLE_USER,
}
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  canActivate(): boolean {
    const roles = JSON.parse(localStorage.getItem('role')!);
    const isAdmin = roles.includes(ERole[ERole.ROLE_ADMIN]);
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
