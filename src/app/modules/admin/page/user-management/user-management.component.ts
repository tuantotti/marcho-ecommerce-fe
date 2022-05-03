import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserManagementService } from '../../services/UserManagementService/user-management.service';
import { IUserInfo } from '../../type/user-management.type';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  @ViewChild('userTable') userTable!: Table;
  userDialog!: boolean;

  users!: IUserInfo[];

  user!: IUserInfo;

  selectedUsers?: IUserInfo[] | null;

  submitted!: boolean;
  roles!: any[];
  constructor(
    private userService: UserManagementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }
  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteSelectedUsers(this.selectedUsers as IUserInfo[]);
        this.selectedUsers = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Users Deleted',
          life: 3000,
        });
      },
    });
  }
  deleteUser(user: IUserInfo) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete user: "' + user.name + '"?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id!);
        this.user = {};
      },
    });
  }
  saveUser() {
    this.submitted = true;
    if (this.user.name!.trim()) {
      if (this.user.id) {
        this.userService.editUser(this.user);
      } else {
        this.userService.saveUser(this.user);
      }

      this.userDialog = false;
      this.user = {};
    }
  }
  onUpload(event: Event) {
    console.log(event);
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    // }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
  openEditUserDialog(user: IUserInfo) {
    this.user = { ...user };
    this.userDialog = true;
  }
  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
  handleFilterBlobal(event: Event) {
    this.userTable.filterGlobal(
      (event.target! as HTMLInputElement).value,
      'contains'
    );
  }
  ngOnInit(): void {
    this.userService.getUsers();
    this.userService.user$.subscribe((data) => (this.users = data));
    this.roles = [
      { label: 'BASICUSER', value: 'BASICUSER' },
      { label: 'ADMIN', value: 'ADMIN' },
    ];
  }
}
