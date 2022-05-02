import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { AuthenticationService } from 'app/modules/authentication/service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor() // private authService: AuthenticationService,
  // private router: Router
  {}
  canActivate(): boolean {
    // if (this.authService.loggedIn()) {
    //   this.router.navigate(['app/project']);
    // }
    // return !this.authService.loggedIn();
    return true;
  }
}
