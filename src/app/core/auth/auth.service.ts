import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // to redirect users after they sign out
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Angular fire provides us with services that we can use to interact w/ Firebase Auth & Firestore
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// Things from RxJS that we will use for the control flow on the user auth observable
import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError, retry } from 'rxjs/operators';
import { User } from '../../shared/models/user';

import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/validators/password-validator';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  userAdmin;
  isUser;
  auth = firebase.auth;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private fb: FormBuilder) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          user.getIdTokenResult().then(idTokenResult => {
            this.userAdmin = idTokenResult.claims.admin;
          });
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null); // allows us to tell if the user isn't logged in
        }
      })
    );
  }

  // Creating a sign up form
  signUpForm = this.fb.group({
    firstName: ['', [Validators.required]],
    middleName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, { validator: PasswordValidator });

  // Login form
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  // Reset form
  resetPasswordForm = this.fb.group({
    email: ['', Validators.required]
  });

  /**
   * Creating getter methods that return a form control to keep code clean
   * since we will use the form control in many conditions
   * returned as a FormControl
   */
  get firstName(): AbstractControl {
    return this.signUpForm.get('firstName');
  }
  get middleName(): AbstractControl {
    return this.signUpForm.get('middleName');
  }
  get lastName(): AbstractControl {
    return this.signUpForm.get('lastName');
  }
  get signupEmail(): AbstractControl {
    return this.signUpForm.get('email');
  }
  get mobile(): AbstractControl {
    return this.signUpForm.get('mobile');
  }
  get signupPassword(): AbstractControl {
    return this.signUpForm.get('password');
  }
  get signupConfirmPassword(): AbstractControl {
    return this.signUpForm.get('confirmPassword');
  }

  // Login getters
  get loginEmail(): AbstractControl {
    return this.loginForm.get('email');
  }
  get loginPassword(): AbstractControl {
    return this.loginForm.get('password');
  }

  // Reset getter
  get resetEmail(): AbstractControl {
    return this.resetPasswordForm.get('email');
  }

  // Google Sign In/Up
  // tslint:disable-next-line: typedef
  async googleSignIn() {
    const provider = new this.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    return this.router.navigate(['/']);
  }

  /**
   * Sign up user using Email and Password using Firebase
   */
  // tslint:disable-next-line: typedef
  async signUp() {
    const credential = await this.afAuth.createUserWithEmailAndPassword(this.signUpForm.controls.email.value,
      this.signUpForm.controls.password.value);
    return this.createUserData(credential.user);
  }

  /**
   * Login user using Email and Password using Firebase
   */
  // tslint:disable-next-line: typedef
  async login() {
    await this.afAuth.signInWithEmailAndPassword(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    return this.router.navigate(['dashboard']);
  }

  // Sign out user
  // tslint:disable-next-line: typedef
  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['']);
  }

  /**
   * Reset password by sending reset information to user's email address
   */
  // tslint:disable-next-line: typedef
  async resetPassword() {
    return await this.afAuth.sendPasswordResetEmail(this.resetPasswordForm.controls.email.value);
    // return this.router.navigate(['login']);
  }

  /**
   * Takes info from the AngularFireAuth state and mirror it on the firestore document
   * This is where you could add any kind of custom data that you want
   * We destructure the properties that we need in the function's argument
   * We're taking the properties on the object & automatically assigning them as variables inside
   * the scope of this function
   * @param user user information gotten from the AngularFireAuth state
   */
  // tslint:disable-next-line: typedef
  private updateUserData({ uid, email, displayName, photoURL }: User) {
    // Sets user data to Firestore on Login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    // Point to the document in the DB with that user ID
    const data = {
      uid,
      email,
      displayName,
      photoURL,
    };
    // merge true option will only change the properties that change in the payload ~ existing data won't be erased
    return userRef.set(data, { merge: true });
  }

  /**
   * This method is used to create a user based on provided inputs in sign up form
   * @param user user information gotten from the AngularFireAuth state
   */
  // tslint:disable-next-line: typedef
  private createUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: this.signUpForm.controls.email.value,
      displayName: this.signUpForm.controls.firstName.value + ' ' + this.signUpForm.controls.lastName.value,
      firstName: this.signUpForm.controls.firstName.value,
      middleName: this.signUpForm.controls.middleName.value,
      lastName: this.signUpForm.controls.lastName.value,
      mobile: this.signUpForm.controls.mobile.value,
    };
    userRef.set(data, { merge: true });
    return this.router.navigate(['dashboard']);
  }

  // tslint:disable-next-line: typedef
  errorHandler(error: HttpErrorResponse) {
    return throwError(`Something went wrong: ${error.message}`);
  }
}
