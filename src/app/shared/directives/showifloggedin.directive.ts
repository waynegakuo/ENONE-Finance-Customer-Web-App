import { AuthService } from './../../core/auth/auth.service';
import { Directive, Input, ViewContainerRef, TemplateRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appShowifloggedin]'
})
export class ShowifloggedinDirective implements OnInit, OnDestroy {
  @Input() appShowifloggedin: boolean;
  subs: Subscription;

  constructor(private auth: AuthService, private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.subs = this.auth.user$.subscribe(
      isLoggedIn => {
        this.viewContainer.clear();
        if (isLoggedIn) {
          if (this.appShowifloggedin) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        } else {
          if (this.appShowifloggedin) {
            this.viewContainer.clear();
          } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        }
      }
    );
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
