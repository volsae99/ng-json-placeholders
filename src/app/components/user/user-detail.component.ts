import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// Model
import { UserModel } from '../../models/user.model';

// Service
import { UsersService } from '../../services/users.service';

@Component({
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  pageTitle = 'User Detail';
  errorMessage = '';
  user: UserModel;
  userForm;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private fb: FormBuilder) {      
  }

  ngOnInit() {
    
    const param = this.route.snapshot.paramMap.get('id');
    
    if (param) {
      const id = +param;
      this.getUser(id);
    }

    console.log(this.user);

    this.userForm = this.fb.group({
      name: [],
      email: [],
      website: []
    });

    this.updateUserForm();
  }

  updateUserForm() {
  this.userForm.patchValue({
    name: this.user.name,
  });
}

  getUser(id: number) {
    this.userService.getUser(id).subscribe(
      user => this.user = user,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }

    onSubmit(userData) {
    // Process user data here
    //this.items = this.cartService.clearCart();
    this.userForm.reset();

    console.warn('User has been saved ', this.user);
  }

}