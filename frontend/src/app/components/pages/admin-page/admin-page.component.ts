import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'; 
@Component({
  selector: 'admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'] // Ispravljeno "styleUrls"
})
export class AdminPageComponent {
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(
    private userService: UserService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  deleteUser(userId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(() => {
          this.users = this.users.filter(user => user.id !== userId);
          Swal.fire(
            'Deleted!',
            'The user has been deleted.',
            'success'
          );
        }, error => {
          console.error('Error while deleting:', error);
        });
      }
    });
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  selectUser(user: User): void {
    this.selectedUser = { ...user };
  }

  updateUser(): void {
    if (!this.selectedUser) {
      return;
    }
    this.userService.updateUser(this.selectedUser, this.selectedUser.id).subscribe(updatedUser => {
      this.loadUsers();
      this.selectedUser = null;
    });
  }

  cancelUpdate(): void {
    this.selectedUser = null;
  }
}
