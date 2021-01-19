import { LenderAccount, LenderProfile } from './../../models/lender.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // to redirect users after they sign out
import { convertTimestamp } from 'convert-firebase-timestamp'; // used to format time stamp
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LenderService {
  currentUserID = '';
  lenderProfileCollection: AngularFirestoreCollection<LenderProfile>;
  lenderProfileId;
  lenderAccountId;
  lenderProfiles: Observable<LenderProfile[]>;

  lenderAccountCollection: AngularFirestoreCollection<LenderAccount>;
  lenderAccounts: Observable<LenderAccount[]>;

  lenderAccountDetailsCollection: AngularFirestoreCollection<LenderAccount>;
  lenderAccountDetails: Observable<LenderAccount[]>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private fb: FormBuilder,
              private router: Router, private snackBar: MatSnackBar) {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.currentUserID = user.uid;
        this.lenderProfileCollection = this.afs.collection('lenderProfile');
      }
    });
  }

  // Creating Lender Profile Form
  lenderProfileForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    physicalAddress: ['', Validators.required],
    postalAddress: ['', Validators.required]
  });

  lenderAccountForm = this.fb.group({
    accountNumber: (null),
    description: ['', Validators.required],
    amount: ['', Validators.required],
    startDate: ['', Validators.required],
    contractEndDate: ['', Validators.required],
    actualEndDate: ['', Validators.required],
    monthlyInterest: ['', Validators.required],
    totalPayable: ['', Validators.required],
    repaymentSchedule: ['', Validators.required],
    repaymentAmount: ['', Validators.required],
    lenderProfileId: (null)
  });

  /**
   * Creating getter methods that return a form control to keep code clean
   * since we will use the form control in many conditions
   * returned as a FormControl
   */
  get name(): AbstractControl {
    return this.lenderProfileForm.get('name');
  }
  get category(): AbstractControl {
    return this.lenderProfileForm.get('category');
  }
  get description(): AbstractControl {
    return this.lenderProfileForm.get('description');
  }
  get email(): AbstractControl {
    return this.lenderProfileForm.get('email');
  }
  get mobile(): AbstractControl {
    return this.lenderProfileForm.get('mobile');
  }
  get physicalAddress(): AbstractControl {
    return this.lenderProfileForm.get('physicalAddress');
  }
  get postalAddress(): AbstractControl {
    return this.lenderProfileForm.get('postalAddress');
  }

  // Getter methods for the Lender Account Form
  get amount(): AbstractControl {
    return this.lenderAccountForm.get('amount');
  }
  get startDate(): AbstractControl {
    return this.lenderAccountForm.get('startDate');
  }
  get contractEndDate(): AbstractControl {
    return this.lenderAccountForm.get('contractEndDate');
  }
  get monthlyInterest(): AbstractControl {
    return this.lenderAccountForm.get('monthlyInterest');
  }

  // tslint:disable-next-line: typedef
  createLenderProfile() {
    this.lenderProfileId = this.afs.createId();
    const lenderProfileRef: AngularFirestoreDocument<LenderProfile> = this.afs.doc(`lenderProfile/${this.lenderProfileId}`);
    const data = {
      id: this.lenderProfileId,
      name: this.lenderProfileForm.controls.name.value,
      category: this.lenderProfileForm.controls.category.value,
      description: this.lenderProfileForm.controls.description.value,
      email: this.lenderProfileForm.controls.email.value,
      mobile: this.lenderProfileForm.controls.mobile.value,
      physicalAddress: this.lenderProfileForm.controls.physicalAddress.value,
      postalAddress: this.lenderProfileForm.controls.postalAddress.value
    };
    lenderProfileRef.set(data, { merge: true });
    return this.router.navigate(['admin/lenderprofiles']);
  }

  // tslint:disable-next-line: typedef
  createLenderAccount(profileId: string) {
    this.lenderAccountId = this.afs.createId();
    const lenderAccountRef: AngularFirestoreDocument<LenderAccount> = this.afs.doc(`lenderAccounts/${this.lenderAccountId}`);
    const data = {
      accountNumber: this.lenderAccountId,
      description: this.lenderAccountForm.controls.description.value,
      amount: this.lenderAccountForm.controls.amount.value,
      startDate: this.lenderAccountForm.controls.startDate.value,
      contractEndDate: this.lenderAccountForm.controls.contractEndDate.value,
      actualEndDate: this.lenderAccountForm.controls.actualEndDate.value,
      monthlyInterest: this.lenderAccountForm.controls.monthlyInterest.value,
      totalPayable: this.lenderAccountForm.controls.totalPayable.value,
      repaymentSchedule: this.lenderAccountForm.controls.repaymentSchedule.value,
      repaymentAmount: this.lenderAccountForm.controls.repaymentAmount.value,
      lenderProfileId: profileId
    };
    lenderAccountRef.set(data, { merge: true });
    this.lenderAccountForm.reset(this.lenderAccountForm.value);
    return this.router.navigate(['admin/lenderprofiles']);
  }

  /**
   * Gets all Lender Profiles from the database
   */
  getLenderProfiles(): Observable<LenderProfile[]> {
    this.lenderProfiles = this.lenderProfileCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    })).pipe(catchError(this.errorHandler));
    return this.lenderProfiles;
  }

  /**
   * Gets all Lender Accounts based on Lender Profile ID from the database
   * @param lenderProfileId id of the Lender Profile obtained from the route URL parameter
   */
  getLenderAccounts(lenderProfileId): Observable<LenderAccount[]> {
    this.lenderAccountCollection = this.afs.collection('lenderAccounts', ref => ref.where('lenderProfileId', '==', lenderProfileId));
    this.lenderAccounts = this.lenderAccountCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    })).pipe(catchError(this.errorHandler));
    return this.lenderAccounts;
  }

  /**
   * Gets the details of the Lender Account selected
   * @param lenderAccountId id of the Lender Account selected obtained from the route URL parameter
   */
  getLenderAccountDetails(lenderAccountId): Observable<LenderAccount[]> {
    this.lenderAccountDetailsCollection = this.afs.collection('lenderAccounts', ref => ref.where('accountNumber', '==', lenderAccountId));
    this.lenderAccountDetails = this.lenderAccountDetailsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        // Formatting dates from original Firebase timestamps to readable date
        data.startDate = convertTimestamp(data.startDate);
        data.contractEndDate = convertTimestamp(data.contractEndDate);
        data.actualEndDate = convertTimestamp(data.actualEndDate);
        return data;
      });
    })).pipe(catchError(this.errorHandler));
    return this.lenderAccountDetails;
  }

  // tslint:disable-next-line: typedef
  numberOfYears(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const yearsDiff = date2.getFullYear() - date1.getFullYear();

    return yearsDiff;
  }

  // tslint:disable-next-line: typedef
  numberOfMonths(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const years = this.numberOfYears(d1, d2);
    const months = years * 12 + (date2.getMonth() - date1.getMonth());

    return months;
  }

  // tslint:disable-next-line: typedef
  calculateLoanPayable() {
    const amount = this.lenderAccountForm.controls.amount.value;
    const interest = this.lenderAccountForm.controls.monthlyInterest.value;
    const startDate = this.lenderAccountForm.controls.startDate.value;
    const contractEndDate = this.lenderAccountForm.controls.contractEndDate.value;
    // const yrs = this.loanCalculatorForm.controls.years.value;

    // Retrieving loan contract date to use for updateLoanPayable function
    const loanActualEndDate = this.lenderAccountForm.controls.contractEndDate.value;

    // Calculate
    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(interest) / 100 / 12;
    const calculatedPayments = this.numberOfMonths(startDate, contractEndDate);
    // const calculatedPayments = parseFloat(yrs) * 12;

    // Calculating the monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    const monthlyPayment = monthly.toFixed(2);

    // Calculating the total interest
    const totalInterest = (monthly * calculatedPayments - principal).toFixed(2);

    // Calculating the total payment
    const totalPayment = (monthly * calculatedPayments).toFixed(2);

    // Rendering values to DOM
    return [totalPayment, monthlyPayment, loanActualEndDate];
  }

  /**
   * Updates the Total Loan Payable value when the loan payable
   * is caluclated after the calculateLoanPayable function is invoked
   * @param totalLoan value obtained from the calculation of total loan payable function
   */
  // tslint:disable-next-line: typedef
  updateTotalLoanPayable(totalLoan, monthlyPayment, loanActualEndDate) {
    this.lenderAccountForm.patchValue({ totalPayable: totalLoan, repaymentAmount: monthlyPayment, actualEndDate: loanActualEndDate });
  }

  /**
   * Method used to populate the lender account form when the specific lender account has been selected for editting
   * @param account the selected lender account
   */
  // tslint:disable-next-line: typedef
  populateForm(account) {
    this.lenderAccountForm.setValue(account);
  }

  /**
   * Updates the Actual End Date of a loan payment upon invocation
   * @param account the selected lender account is passed to obtain details such as the lender account number
   */
  // tslint:disable-next-line: typedef
  updateLenderAccount(account) {
    const lenderAccountRef: AngularFirestoreDocument<LenderAccount> = this.afs.doc(`lenderAccounts/${account.accountNumber}`);
    const updatedActualEndDate = this.lenderAccountForm.controls.actualEndDate.value;
    lenderAccountRef.update({ actualEndDate: updatedActualEndDate });
    this.openSnackBar();
  }

  // tslint:disable-next-line: typedef
  openSnackBar() {
    const msg = 'Lender Account Details Updated';
    const act = 'OK!';
    this.snackBar.open(msg, act, {
      duration: 5000,
    });
    this.lenderAccountForm.reset();
  }

  /**
   * Error handling method for console
   * @param error error passed as a parameter
   */
  // tslint:disable-next-line: typedef
  errorHandler(error: HttpErrorResponse) {
    return throwError(`Something went wrong: ${error.message}`);
  }
}
