import { Router } from '@angular/router';
import { Repayment } from './../../models/repayments.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  baseUrl = 'http://devenonebackendapp-env.eba-yrfqtiqs.us-east-2.elasticbeanstalk.com/api/payments/pay';

  repaymentCollection: AngularFirestoreCollection<Repayment>;
  repayments: Observable<Repayment[]>;

  repaymentId;

  constructor(private http: HttpClient, private afs: AngularFirestore, private fb: FormBuilder,
              private router: Router, private snackBar: MatSnackBar) {
    this.repaymentCollection = this.afs.collection('repayments');
  }

  repaymentForm = this.fb.group({
    name: ['', Validators.required],
    confirmationCode: ['', Validators.required]
  });

  // tslint:disable-next-line: typedef
  payLoan(body) {
    return this.http.post<any>(this.baseUrl, body);
  }

  // Get repayments made from Firebase
  getRepayments(): Observable<Repayment[]>{
    this.repayments = this.repaymentCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    })).pipe(catchError(this.errorHandler));
    return this.repayments;
  }

  // tslint:disable-next-line: typedef
  addRepayment(){
    this.repaymentId = this.afs.createId();
    const repaymentRef: AngularFirestoreDocument<Repayment> = this.afs.doc(`repayments/${this.repaymentId}`);
    const data = {
      repaymentId: this.repaymentId,
      name: this.repaymentForm.controls.name.value,
      confirmationCode: this.repaymentForm.controls.confirmationCode.value,
    };
    repaymentRef.set(data, {merge: true});
    this.repaymentForm.reset();
    this.openSnackBar();
    return this.router.navigate(['dashboard']);
  }

  // tslint:disable-next-line: typedef
  openSnackBar() {
    const msg = 'Thank your for repaying your loan';
    const act = 'OK!';
    this.snackBar.open(msg, act, {
      duration: 5000,
    });
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
