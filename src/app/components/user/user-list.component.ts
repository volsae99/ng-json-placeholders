import { Component, OnInit } from '@angular/core';

// Model
import { UserModel } from '../../models/user.model';

// Service
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  pageTitle = 'User List';
  users: UserModel[];
  errorMessage = '';

  constructor(
    private usersService: UsersService
   ) { }
  
  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(
        users => this.users = users, 
        error => this.errorMessage = <any>error)
  }

  ngOnInit() {
    this.getUsers()
  }

}