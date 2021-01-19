import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoansappliedService {
  allLoansCollection: AngularFirestoreCollection<any>;
  loansAppliedCollection: AngularFirestoreCollection<any>;
  fileUploadsCollection: AngularFirestoreCollection<any>;
  allLoans: Observable<any>;
  loansApplied: Observable<any>;
  fileUploads: Observable<any>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.allLoansCollection = this.afs.collection('loans');
      }
    });
  }

  /**
   * Gets all loans from the loans collection
   * This function is only available to the admin
   */
  // tslint:disable-next-line: typedef
  getAllLoans() {
    this.allLoans = this.allLoansCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    })).pipe(catchError(this.errorHandler));
    return this.allLoans;
  }

  /**
   * Get loans applied of a specific users based on the user ID
   * Available to the admin
   */
  // tslint:disable-next-line: typedef
  getLoansApplied(loanApplicationId){
    this.loansAppliedCollection = this.afs.collection('loans', ref => ref.where('loanId', '==', loanApplicationId));
    this.loansApplied = this.loansAppliedCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    })).pipe(catchError(this.errorHandler));
    return this.loansApplied;
  }

  /**
   * Gets file uploads for a specific loan application
   * uses the loan application ID as the parameter since every
   * file upload has a loan application ID
   */
  // tslint:disable-next-line: typedef
  getFileUploads(loanApplicationId){
    this.fileUploadsCollection = this.afs.collection('files', ref => ref.where('loanId', '==', loanApplicationId));
    this.fileUploads = this.fileUploadsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    })).pipe(catchError(this.errorHandler));
    return this.fileUploads;
  }

  // tslint:disable-next-line: typedef
  errorHandler(error: HttpErrorResponse) {
    return throwError(`Something went wrong: ${error.message}`);
  }
}
