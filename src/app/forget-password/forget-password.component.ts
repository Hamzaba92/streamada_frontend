import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  goToLoginComp() {
    this.router.navigate(['login']);
  }

  closePopup() {
    this.showpopup = false;
    this.email = '';
  }


  onSubmit() {
    if (this.email) {

      console.log('send');

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.showpopup = true;
      }, 4000);
      



    }
  }
}
