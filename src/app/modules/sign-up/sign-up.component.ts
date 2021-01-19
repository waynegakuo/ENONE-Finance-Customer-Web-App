import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  submitted = false;
  errorMsg;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  signUpUser() {
    this.submitted = true;
    this.auth.signUp().then(() => {
      return this.router.navigate(['/']);
    })
    .catch(err => this.errorMsg = err.message);
  }
}
