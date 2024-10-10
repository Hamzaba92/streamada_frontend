import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmNewPasswordService } from '../services/confirm-new-password.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  constructor(private router: Router, private route: ActivatedRoute, private confirmNewPassword: ConfirmNewPasswordService) { }

  resetPassword: string = '';
  confirmPassword: string = '';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  passwordsMatch: boolean = true;
  passwordPattern: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&._#+\-=/^:;])[A-Za-z\d@$!%*?&._#+\-=/^:;]{8,}$/;
  loading: boolean = false;
  showpopup: boolean = false;
  uid: string = '';
  token: string = '';

  ngOnInit(): void {
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

  goToLoginComp() {
    this.router.navigate(['login']);
  }

  closePopup() {
    this.showpopup = false;
    location.reload();
  }

  playFeedbackAudio() {
    let audio = new Audio('assets/audio/reset_pw_feedback.mp3');
    audio.play();
  }

  onSubmit() {
    if (!this.doPasswordsMatch()) {
      console.log('passwords do not match');
      return;
    }
    this.loading = true;
    this.confirmNewPassword.resetPassword(this.uid, this.token, this.resetPassword)
      .subscribe(
        response => {
          this.loading = false;
          this.playFeedbackAudio();
          this.showpopup = true;
        },
        error => {
          console.error('Error resetting password', error);
          this.loading = false;
        }
      )

  }

}

