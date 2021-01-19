import { MailSmsService } from './../services/mail-sms/mail-sms.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Directive, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { tap, map, take, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Directive({
  selector: '[appAutosave]',
  exportAs: 'autosaveDirective'
})
export class AutosaveDirective implements OnInit, OnDestroy {

  // This is the path to the FireStore document/collection
  @Input() path: string;

  //  Intercepting the FormGroup from the component by adding it as an input property on this Directive
  @Input() formGroup: FormGroup;

  private state: 'loanding' | 'synced' | 'modified' | 'error';

  currentUserID;
  currentUserDisplayName;
  getDate = this.formatDate(new Date());
  getLoanId;
  currentUserEmail;
  currentUserPhoneNumber;

  userDetails;
  subs: Subscription;

  // Parent component to listen to these state changes & errors
  @Output() stateChange = new EventEmitter<string>();
  @Output() formError = new EventEmitter<string>();

  // Firestore document
  private docRef: AngularFirestoreDocument;

  // Subscriptions
  private formSub: Subscription;

  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar, private router: Router,
              private afAuth: AngularFireAuth, private mailSmsService: MailSmsService) {
    // Getting ID of signed in user
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.currentUserID = user.uid;
        // console.log(user.uid);
      }
    });

  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.preloadData();
    this.autoSave();

    // Getting displayName of currently logged in user from the users collection
    this.subs = this.afs.collection('users').doc(this.currentUserID).get()
      .subscribe(a => {
        // console.log(a.data());
        this.userDetails = a.data();
        this.currentUserDisplayName = this.userDetails.displayName;
        this.currentUserEmail = this.userDetails.email;
        this.currentUserPhoneNumber = this.userDetails.mobile;
      });
  }

  // Attaching a new function  formatDate()  to any instance of Date() class
  // tslint:disable-next-line: typedef
  formatDate(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ][myDate.getMonth()];
      const str = myDate.getDate() + ' ' + month + ' ' + myDate.getFullYear();
      return str;
    }
    return '';
  }

  // Setter for state changes
  set stateSet(val) {
    this.state = val;
    this.stateChange.emit(val);
  }

  /**
   * Writes changes to Firestore
   */
  // tslint:disable-next-line: typedef
  async setDoc() {
    const userId = this.currentUserID;
    const userDisplayName = this.currentUserDisplayName;
    const loanApplication = this.formGroup.value;
    const approved = 'Pending';
    const loanStatus = 'Loan Application Submitted';
    const dateApplied = this.getDate;
    const addedAt = Date.now();
    const loanId = this.getLoanId;
    try {
      await this.docRef.set({ loanApplication, userId, userDisplayName, addedAt, approved, loanStatus, dateApplied, loanId },
        { merge: true });
      this.stateSet = 'synced';
    }
    catch (err) {
      console.log(err);
      this.formError.emit(err.message);
      this.state = 'error';
    }
  }

  /**
   * Sends email and SMS after getting user details
   */
  async sendMailSMS(): Promise<void>{
    // Collect user details for mail and SMS sending
    const bodyData = {
      email: `${this.currentUserEmail}`,
      phone: `${this.currentUserPhoneNumber}`
    };
    // Send mail and SMS after collecting user details
    this.mailSmsService.sendMailSms(bodyData).subscribe(data => {
      console.log(data);
    });
  }

  /**
   * Loads initial data from Firestore
   */
  // tslint:disable-next-line: typedef
  preloadData() {
    this.stateSet = 'loading';
    this.docRef = this.getDocRef(this.path); // Determines if we're dealing w/ a document or a collection ~ will define last
    this.docRef
      .valueChanges()
      .pipe(
        tap(doc => {
          if (doc) {
            console.log(doc);
            this.formGroup.patchValue(doc);
            this.formGroup.markAsPristine();
            this.stateSet = 'synced';
          }
        }),
        take(1) // to prevent any unnecessary reads ~ when dealing w/ forms we generally don't need them to be a real-time stream
      )
      .subscribe();
  }

  /**
   * Autosaves form changes
   * We'll keep it as a real time stream of the reactive form changes
   * Order of operators is important
   * 1st tap will be exectued on every form value change
   * 2nd tap is only executed when the debounce of 2000 ms finishes
   */
  // tslint:disable-next-line: typedef
  autoSave() {
    this.formSub = this.formGroup.valueChanges
      .pipe(
        tap(change => {
          this.stateSet = 'modified';
        }),
        debounceTime(2000),
        tap(change => {
          if (this.state === 'modified') {
            this.setDoc();
          }
        })
      )
      .subscribe();
  }

  /**
   * Allows the user to submit the form as usual without
   * waiting for the debounce time to expire
   * @param e event on click
   */
  @HostListener('ngSubmit', ['$event'])
  // tslint:disable-next-line: typedef
  onSubmit(e) {
    this.setDoc();
    this.sendMailSMS();
    this.openSnackBar('Your Loan Application has been submitted', 'Done!');
    return this.router.navigate(['/dashboard']);
  }

  // tslint:disable-next-line: typedef
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  /**
   * Determines if path is a collection or a document
   * If we break up a document path by slashes,
   * we know that every odd numbered segment is a collection and
   * every even numbered segment is a document
   * @param path either the collection or doc
   */
  getDocRef(path: string): any {
    if (path.split('/').length % 2) {
      this.getLoanId = this.afs.createId();
      return this.afs.doc(`${path}/${this.getLoanId}`);
    }
    else {
      return this.afs.doc(path);
    }
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    this.formSub.unsubscribe();
    this.subs.unsubscribe();
  }

}
