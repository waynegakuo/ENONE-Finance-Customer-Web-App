import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  signOutUser(){
    this.auth.signOut();
  }

  // tslint:disable-next-line: typedef
  toggleSideBar() {
    // tslint:disable-next-line: no-unused-expression
    this.toggleSideBarForMe.emit();

    // Trick for making the chart responsive
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
