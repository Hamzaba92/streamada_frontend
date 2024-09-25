import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
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

  constructor(private router: Router){}

  togglePasswordVisibility() {
    this.hide = !this.hide; 
  }

  backToLandingpage(){
   this.router.navigate(['landingpage']); 
  }

  openSignUpComp(){
    this.router.navigate(['/register']);
  }

  openForgetPasswordComp(){
    this.router.navigate(['forget-password']);
  }


  onSubmit(){
    if(this.emailFormControl && this.passwordFormControl){
      console.log('login erfolgreich!')
      this.loading = true;
      setTimeout(() => {
        this.showpopup = true;
      }, 3000);
      this.showpopup = false;
    }else{
      //hier wird serverseite errormeldungen reingerendert
      
    }
  }
}
