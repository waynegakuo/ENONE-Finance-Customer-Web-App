import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMsg;
  submitted: boolean;
  // Public since we want to bind it to the HTML
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  loginUser() {
    this.auth.login()
      .catch(err => this.errorMsg = err.message);
  }

}
