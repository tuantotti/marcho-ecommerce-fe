import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/modules/authentication/service/authentication.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('X-Account-Id');
    if (token) {
      // Clone the request and set the new header in one step.
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          // 'X-Account-Id': userId as string,
        },
      });
    }
    return next.handle(req);
  }
}
