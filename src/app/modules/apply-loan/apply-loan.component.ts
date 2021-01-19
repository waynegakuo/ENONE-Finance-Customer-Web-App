import { Subscription, Observable } from 'rxjs';
import { LoanapplicationService } from './../../shared/services/loanapplication/loanapplication.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LoanApplication } from 'src/app/shared/models/loanapplication';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss']
})
export class ApplyLoanComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput;

  file: File | null = null;

  isLinear = false;
  errorMsg = '';
  loanSummary: boolean;

  currentLoan: Observable<Array<any>>;
  currentLoanCollection: AngularFirestoreCollection<any>;

  // For the "Loan details" section
  loanPurpose = ['Working Capital', 'Motor Vehicle/ Equipment Purchase', 'Land/ House Purchase',
    'Construction Loan', 'Importation of Goods', 'Medical Emergency', 'School Fees Loan'];

  ownership = ['Sole Proprietorship', 'Partnership', 'Limited Liability Company'];

  industry = ['Agriculture', 'Manufacturing', 'Building/Construction', 'Mining/Quarrying/Energy/Water',
    'Trade', 'Tourism/Restaurant/Hotels', 'Transport/Communication', 'Real Estate',
    'Financial Services', 'Government', 'Others'];

  countries = ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi'];

  title = ['Mr.', 'Mrs.', 'Ms.'];

  maritalStatus = ['Single', 'Married', 'Divorced'];

  nationality = ['Kenyan', 'Ugandan', 'Tanzanian', 'Rwandan', 'Burundian'];

  viewLoan: boolean;
  currentLoanSummaryView: boolean;
  termsAndConditions;

  // File picker
  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }

  constructor(public applyLoan: LoanapplicationService, private db: AngularFirestore, private fb: FormBuilder) { }

  get sign(): AbstractControl {
    const sign = this.termsAndConditions.get('sign');
    return sign;
  }
  get tc(): AbstractControl {
    const tc = this.termsAndConditions.get('tc');
    return tc;
  }

  ngOnInit(): void {
    this.termsAndConditions = this.fb.group({
      sign: [false, [Validators.required, Validators.requiredTrue]],
      tc: [false, [Validators.required, Validators.requiredTrue]]
    });
  }


  /**
   * Gets the currently applied loan's details
   * @param id the loan id of the current loan obtained from the autosave directive
   */
  // tslint:disable-next-line: typedef
  getCurrentLoan(id: string) {
    const currentLoanId = id;
    this.viewLoan = !this.viewLoan;

    // Get current loan being applied for summary
    this.currentLoanCollection = this.db.collection('loans', ref => ref.where('loanId', '==', currentLoanId));

    this.currentLoan = this.currentLoanCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as LoanApplication;
        data.loanId = a.payload.doc.id;
        return data;
      });
    }));
    return this.currentLoan;
  }
}
