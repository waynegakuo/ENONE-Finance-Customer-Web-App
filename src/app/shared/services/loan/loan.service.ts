import { LoanApplication } from './../../models/loanapplication';
import { User } from './../../models/user';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { convertTimestamp } from 'convert-firebase-timestamp';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  loansCollection: AngularFirestoreCollection<any>;
  loans: Observable<any>;
  loanDoc: AngularFirestoreDocument<any>;
  currentUserID = '';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.currentUserID = user.uid;
        this.loansCollection = this.afs.collection('loans', ref => ref.where('userId', '==', user.uid));
      }
    });
  }

  // tslint:disable-next-line: typedef
  getLoans() {
    this.loans = this.loansCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        // Formatting dates from original Firebase timestamps to readable date
        data.dateApplied = convertTimestamp(data.dateApplied);
        return data;
      });
    })).pipe(catchError(this.errorHandler));
    return this.loans;
  }

  // tslint:disable-next-line: typedef
  getCurrentUserDetails() {
    return this.afs.collection('users').doc(this.currentUserID).get()
      .pipe(catchError(this.errorHandler));
  }

  // tslint:disable-next-line: typedef
  errorHandler(error: HttpErrorResponse) {
    return throwError(`Something went wrong: ${error.message}`);
  }
}
