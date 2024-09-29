import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { AuthServiceService } from '../services/auth-service.service';
import { LoginData, LoginResponse } from './model.login';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  hide = true;

  loading: Boolean = false;
  showpopup: boolean = false;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private loginservice: LoginService, private authService: AuthServiceService) { }

  loginEnterSound(){
    let audio = new Audio('assets/audio/success_login_audio.mp3');
    audio.play();
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  backToLandingpage() {
    this.router.navigate(['landingpage']);
  }

  openSignUpComp() {
    this.router.navigate(['/register']);
  }

  openForgetPasswordComp() {
    this.router.navigate(['forget-password']);
  }


  onSubmit() {
    this.errorMessage = '';

    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const credentials: LoginData = {
        email: this.emailFormControl.value as string,
        password: this.passwordFormControl.value as string,
      }
      this.loading = true;

      this.loginservice.login(credentials).subscribe({
        next: (response: LoginResponse) => {
          this.loading = false;
          this.successMessage = response.message;
          this.authService.setToken(response.token);
          this.showpopup = true;
          this.loginEnterSound();
          
          setTimeout(() => {
            this.showpopup = false;
            this.router.navigate(['streamada-overview']);
          }, 1400);

        },
        error: (error: any) => {
          this.loading = false;
          this.errorMessage = error;
        }
      });
    } else {
      this.errorMessage = 'Please fill all requirements.';
    }
  }



}
