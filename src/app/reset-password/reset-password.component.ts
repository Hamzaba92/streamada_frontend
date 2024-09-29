import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  constructor(private router: Router, private route: ActivatedRoute){}

  resetPassword: string = '';
  confirmPassword: string = '';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  passwordsMatch: boolean = true;
  passwordPattern: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  loading: boolean = false;
  showpopup: boolean = false;
  uid: string = '';
  token: string = '';

  ngOnInit(): void {
    // Abrufen von `uid` und `token` aus der URL
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }
  
  togglePasswordVisibility(type: string): void {
    if (type === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (type === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

  doPasswordsMatch(): boolean {
    return this.resetPassword === this.confirmPassword;
  }

  goToLoginComp(){
    this.router.navigate(['login']);
  }

  closePopup(){
    this.showpopup = false;
    location.reload();
  }

  onSubmit() {
    if (!this.doPasswordsMatch()) {
      //server-antwort rein rendern!
    } else {
      console.log('Form submitted successfully');
      this.loading = true; 
      setTimeout(() => {
        this.loading = false;
        this.showpopup = true;
      }, 4000);
    }
  }
}
