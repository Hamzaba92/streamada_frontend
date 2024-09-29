import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { PasswordResetService } from '../services/password-reset.service';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  email = '';

  loading: boolean = false;
  showpopup: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, public passwortResetService: PasswordResetService) { }

  goToLoginComp() {
    this.router.navigate(['login']);
  }

  closePopup() {
    this.showpopup = false;
    this.email = '';
  }


  onSubmit() {
    if (this.email) {
      this.errorMessage = '';
      this.loading = true;

      this.passwortResetService.sendPasswordResetEmail(this.email).subscribe(
        response => {
          this.loading = false;
          this.showpopup = true;

        },
        error => {
          this.loading = false;
          if (error.status === 400 && error.error.email) {
            this.errorMessage = error.error.email[0];
          } else {
            this.errorMessage = 'An error occurred, please try again.';
          }
        }
      );
    }
  }
}

