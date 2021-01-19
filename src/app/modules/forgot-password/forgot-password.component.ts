import { ForgotpasswordService } from './../../shared/services/forgotpassword.service';
import { ForgotPassword } from './../../shared/models/forgotpassword';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitted = false;
  errorMsg = '';

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  resetPassword() {
    this.submitted = true;
    this.auth.resetPassword();
  }
}
