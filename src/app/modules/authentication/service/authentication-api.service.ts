import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  ILoginRequest,
  ILoginResponse,
  ILoginResponseWrapper,
  IUserInforResponse,
  IUserInforResponseWrapper,
} from '../type/authentication.type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApiService {
  API_URL = environment.serverUrl;
  constructor(private http: HttpClient) {}

  logIn({
    userNameOrEmailAddress,
    password,
    rememberMe,
  }: ILoginRequest): Observable<ILoginResponseWrapper<ILoginResponse>> {
    return this.http.post<ILoginResponseWrapper<ILoginResponse>>(
      `${this.API_URL}/api/TokenAuth/Authenticate`,
      {
        userNameOrEmailAddress,
        password,
        rememberMe,
      }
    );
  }

  getUserInfor(): Observable<any> {
    return this.http.get<IUserInforResponseWrapper<IUserInforResponse>>(
      `${this.API_URL}/api/services/app/Session/GetCurrentLoginInformations`
    );
  }
}
