import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { IUserInfo } from '../../type/user-management.type';

@Injectable({
  providedIn: 'root',
})
export class UserManagementApiService {
  API_URL = environment.serverUrl;

  constructor(private http: HttpClient) {}
  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/user`);
  }
  saveUser(user: IUserInfo): Observable<any> {
    return this.http.post(`${this.API_URL}/user`, user);
  }
  editUser(user: IUserInfo): Observable<any> {
    return this.http.put(`${this.API_URL}/user/${user.id}`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/user/${id}`);
  }
}
