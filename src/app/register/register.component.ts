import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule,

} from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { RegisterService } from '../services/register.service';
import { RegisterData, RegisterResponse } from './register.model';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private emailService: EmailService,
    private registerservice: RegisterService
  ) { }

  email: string = '';
  showPopup: boolean = false;
  loading: boolean = false;
  backendErrors: any = null;


  ngOnInit(): void {
    this.email = this.emailService.getEmail(); 

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&._#+\-=/^:;])[A-Za-z\d@$!%*?&._#+\-=/^:;]{8,}$/
)
      ]],
      confirmPassword: ['', Validators.required]
    });
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&._#+\-=/^:;])[A-Za-z\d@$!%*?&._#+\-=/^:;]{8,}$/)
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  get passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  hidePassword = true;
  hideConfirmPassword = true;

  togglePasswordVisibility(type: string): void {
    if (type === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (type === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

  backtoLandingpage() {
    this.router.navigate(['landingpage']);
  }

  getBackendErrorKeys(): string[] {
    return Object.keys(this.backendErrors || {});
  }

  closePopup() {
    this.showPopup = false;
    location.reload();
  }

  SendEmailSound(){
    let audio = new Audio('./assets/audio/email_send_wish.wav');
    audio.play();
  }

  onSubmit() {
    if (this.registerForm.valid) {

      const formData = this.registerForm.value;
      const userData: RegisterData = {
        first_name: formData.firstName!,
        last_name: formData.lastName!,
        email: formData.email!.toLowerCase(),
        password: formData.password!,
        confirm_password: formData.confirmPassword!
      };

      this.loading = true;
      this.registerservice.register(userData).subscribe(
        (response: RegisterResponse) => {
          console.log('user successfully registered', response);
          this.loading = false;
          this.SendEmailSound();
          this.showPopup = true;
        },
        error => {
          console.log('error registering user', error);
          this.loading = false;
          this.backendErrors = error.error;
        }
      );
    }
  }

}
