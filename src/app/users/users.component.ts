import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  deletedUsers: User[] = [];
  editedUser: User = {} as User; // Initialize with an empty User object
  newUser: User = {} as User; // Initialize with an empty User object

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log('Users fetched:', this.users); // Debug log
    });
  }

  openEditModal(user: User): void {
    this.editedUser = { ...user }; // Create a copy of the user to prevent direct modification
    console.log('Editing user:', this.editedUser); // Debug log
    this.toggleModal(true, 'editUserModal');
  }

  toggleModal(display: boolean, modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (display) {
        modal.style.display = 'block';
        modal.classList.add('show');
      } else {
        modal.style.display = 'none';
        modal.classList.remove('show');
      }
    }
  }
  openAddModal(): void {
    this.newUser = {} as User; // Reset newUser object
    console.log('Opening add user modal'); // Debug log
    this.toggleModal(true, 'addUserModal');
  }

  saveUser(): void {
    if (this.editedUser && this.editedUser.userId) {
      console.log('Saving user with ID:', this.editedUser.userId); // Debug log
      this.usersService.updateUser(this.editedUser).subscribe({
        next: (updatedUser) => {
          if (updatedUser) {
            console.log('User updated:', updatedUser); // Debug log
            const index = this.users.findIndex(user => user.userId === updatedUser.userId);
            if (index !== -1) {
              this.users[index] = updatedUser;
            } else {
              console.error('Updated user not found in users array'); // Debug log
            }
            this.closeModal('editUserModal');
            this.getAllUsers(); // Refresh the user list
          } else {
            console.error('Updated user is null'); // Debug log
          }
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    } else {
      console.error('User data is incomplete or missing:', this.editedUser);
      // Optionally display an error message to the user
    }
  }


  addUser(): void {
    console.log('Adding new user:', this.newUser); // Debug log
    this.usersService.createUser(this.newUser).subscribe(newUser => {
      console.log('User created:', newUser); // Debug log
      this.users.push(newUser);
      this.closeModal('addUserModal');
    }, error => {
      console.error('Error creating user:', error);
    });
  }

  deleteUser(user: User): void {
    console.log('Deleting user:', user); // Debug log
    this.usersService.deleteUser(user.userId).subscribe(() => {
      this.deletedUsers.push(user); // Add the deleted user to the deletedUsers array
      this.users = this.users.filter(u => u !== user);
      console.log('User deleted:', user); // Debug log
    }, error => {
      console.error('Error deleting user:', error);
    });
  }

  restoreUser(user: User): void {
    console.log('Restoring user:', user); // Debug log
    this.usersService.createUser(user).subscribe(() => {
      this.deletedUsers = this.deletedUsers.filter(u => u !== user);
      this.users.push(user);
      console.log('User restored:', user); // Debug log
    }, error => {
      console.error('Error restoring user:', error);
    });
  }

  toggleUserStatus(user: User): void {
    const newStatus = user.isActive === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    console.log(`Toggling user status for ${user.userId} to ${newStatus}`); // Debug log
    user.isActive = newStatus; // Update status locally
    this.usersService.updateUserStatus(user.userId, newStatus).subscribe({
      next: (updatedUser) => {
        console.log('User status updated:', updatedUser); // Debug log
        const index = this.users.findIndex(u => u.userId === user.userId);
        if (index !== -1) {
          this.users[index] = updatedUser;
        } else {
          console.error('Updated user not found in users array'); // Debug log
        }
        this.getAllUsers(); // Refresh the user list
      },
      error: (error) => {
        console.error('Error updating user status:', error);
        // Optionally revert the change locally if the update fails
        user.isActive = user.isActive === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      }
    });
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      console.log(`Modal ${modalId} closed`); // Debug log
    }
  }
}
