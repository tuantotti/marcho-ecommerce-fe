import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IUserInfo } from '../../type/user-management.type';
import { UserManagementApiService } from './user-management-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor(
    private userManagementApiService: UserManagementApiService,
    private toast: ToastrService
  ) {}
  private userBS = new BehaviorSubject<IUserInfo[]>([]);
  get user$() {
    return this.userBS.asObservable();
  }
  getUsers() {
    this.userManagementApiService.getUsers().subscribe(
      (data) => {
        this.userBS.next(data);
      },
      (err) => {
        this.toast.error('Fetching data error!');
      }
    );
  }
  saveUser(user: IUserInfo) {
    this.userManagementApiService.saveUser(user).subscribe(
      (data) => {
        this.toast.success('User created successfully!');
        this.getUsers();
      },
      (err) => {
        this.toast.error('User created error!');
      }
    );
  }
  editUser(user: IUserInfo) {
    this.userManagementApiService.editUser(user).subscribe(
      (data) => {
        this.toast.success('User editted successfully!');
        this.getUsers();
      },
      (err) => {
        this.toast.success('User editted error!');
      }
    );
  }
  deleteUser(id: number) {
    this.userManagementApiService.deleteUser(id).subscribe(
      (data) => {
        this.toast.success('User deleted successfully!');
        this.getUsers();
      },
      (err) => {
        this.toast.success('User deleted error!');
      }
    );
  }
  deleteSelectedUsers(selectedUsers: IUserInfo[]) {
    selectedUsers.map((user) => {
      this.userManagementApiService.deleteUser(user.id!).subscribe(
        (data) => {
          this.getUsers();
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
