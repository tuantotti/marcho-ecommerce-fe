import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from 'app/modules/authentication/service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  canActivate(): boolean {
    if (!this.authService.loggedIn()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
