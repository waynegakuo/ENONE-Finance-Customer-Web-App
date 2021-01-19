import { LoanApplication } from './../../models/loanapplication';
import { LoanfeatureService } from './../loanfeature.service';
import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoanapplicationService implements OnDestroy {
  file: File;

  state: string; // checking state of the form on autosave feature

  task: AngularFireUploadTask;

  loansCollection: AngularFirestoreCollection<any>;
  currentLoanCollection: AngularFirestoreCollection<any>;
  loans: Observable<any>;
  loanDoc: AngularFirestoreDocument<LoanApplication>;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  currentLoanSummaryView: boolean;
  subs: Subscription;  personalSubs: Subscription;
  businessSubs: Subscription;


  currentUserID; // To obtain signed in user ID

  // Forms to be used
  loanApplicationForm: FormGroup;
  registrationForm: FormGroup;
  incomeDetailsForm: FormGroup;
  applicantDetailsForm: FormGroup;
  loanDetailsForm: FormGroup;
  smallForm: FormGroup;

  // For the "Loan details" section
  loanFeature = [];
  personalLoanFeature = [];
  businessLoanFeature = [];
  errorMsg = '';

  // Collateral Types booleans
  land = false;
  propertyBuildings = false;
  shares = false;
  debentures = false;
  chattels = false;
  postDated = false;
  insurance = false;

  isBusiness = false;
  isContract = false;
  isBusinessLoan = false;
  hasOtherInstitution = false;

  loanTypeArray = ['Business', 'Personal'];
  collateralTypes = ['Land', 'Property and Buildings', 'Shares', 'Debentures',
    'Chattels /Charge over Movable Assets (Motor Vehicle, Machinery, other assets)', 'Post Dated Cheques', 'Insurance Policies'];

  // #########################################################################################################

  /**
   * Creating getter methods that return a form control to keep code clean
   * since we will use the form control in many conditions
   * items is returned as a FormGroup from the formArray
   */

  get loanApplicationArray(): AbstractControl | null {
    return this.loanApplicationForm.get('loanApplicationArray');
  }

  // Getting radio button values
  get loanType(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0');
    return items.get('loanType');
  }

  get company(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.personalDetails');
    return items.get('company');
  }
  get building(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.personalDetails.companyAddress');
    return items.get('building');
  }
  get street(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.personalDetails.companyAddress');
    return items.get('street');
  }
  get county(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.personalDetails.companyAddress');
    return items.get('county');
  }
  get postalAddress(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.personalDetails.companyAddress');
    return items.get('postalAddress');
  }
  get postalCode(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.personalDetails.companyAddress');
    return items.get('postalCode');
  }
  get contractYears(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.personalDetails');
    return items.get('contractYears');
  }
  get earnings(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.personalDetails');
    return items.get('earnings');
  }

  // Getting radio button values
  get employmentNature(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.personalDetails');
    return items.get('employmentNature');
  }

  // Business details for Income Details section
  get businessName(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('businessName');
  }
  get ownershipType(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('ownershipType');
  }
  get regNumber(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('regNumber');
  }
  get regDate(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('regDate');
  }
  get industry(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('industry');
  }
  get kraPin(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('kraPin');
  }
  get vatNumber(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('vatNumber');
  }
  get employeesNum(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('employeesNum');
  }
  get yearsInBusiness(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('yearsInBusiness');
  }
  get turnOverRange(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('turnOverRange');
  }
  get projectedTurnOver(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('projectedTurnOver');
  }
  get dateFrom(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('dateFrom');
  }
  get dateTo(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('dateTo');
  }
  get grossProfit(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('grossProfit');
  }
  get netProfitBeforeTax(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('netProfitBeforeTax');
  }
  get countriesOperating(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('countriesOperating');
  }
  get businessBuilding(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails.address');
    return items.get('building');
  }
  get businessStreet(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails.address');
    return items.get('street');
  }
  get businessCounty(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails.address');
    return items.get('county');
  }
  get businessPostalAddress(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails.address');
    return items.get('postalAddress');
  }
  get businessPostalCode(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails.address');
    return items.get('postalCode');
  }
  get contactName(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('contactName');
  }
  get contactEmail(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('contactEmail');
  }
  get contactMobile(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.0.businessDetails');
    return items.get('contactMobile');
  }

  get applicantTitle(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('title');
  }
  get firstName(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('firstName');
  }
  get middleName(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('middleName');
  }
  get lastName(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('lastName');
  }
  get gender(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('gender');
  }
  get maritalStatus(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('maritalStatus');
  }
  get id(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('title');
  }
  get applicantKraPin(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('title');
  }
  get nationality(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('nationality');
  }
  get dob(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.1');
    return items.get('dob');
  }

  // Dynamically adding FormControls
  // tslint:disable-next-line: typedef
  get addedApplicantsForm() {
    return this.loanApplicationForm.get('loanApplicationArray.1').get('addedApplicants') as FormArray;
  }

  // Add another applicant
  // tslint:disable-next-line: typedef
  addApplicant() {

    const applicant = this.fb.group({
      addedApplicantTitle: [],
      addedApplicantFirstName: [],
      addedApplicantMiddleName: [],
      addedApplicantLastName: [],
      addedApplicantGender: [],
      addedApplicantMaritalStatus: [],
      addedApplicantId: [],
      addedApplicantKraPin: [],
      addedApplicantNationality: [],
      addedApplicantDob: [],
      addedApplicantSocialMedia: []
    });

    this.addedApplicantsForm.push(applicant);

    this.addApplicantDocumentSection.call(this); // Add another document upload section in the 4th step automatically

  }

  // Remove added applicant
  // tslint:disable-next-line: typedef
  removeApplicant(i) {
    this.addedApplicantsForm.removeAt(i);

    this.removeAddedDocumentSection.call(this); // Remove the added document upload section in the 4th step automatically
  }

  // Getting dropdown values in step 3
  get loanTypeFacility(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('loanFacilityType');
  }

  get borrowAmount(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('borrowAmount');
  }
  get loanPurpose(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('loanPurpose');
  }
  get repaymentPeriod(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('repaymentPeriod');
  }
  get otherInstitutions(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('otherInstitutions');
  }
  get financialInstitution(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('financialInstitution');
  }
  get loanAmount(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('loanAmount');
  }
  get outStandingBalance(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('outStandingBalance');
  }
  get institutionLoanType(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('loanType');
  }
  get repaymentAmountMonthly(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('repaymentAmountMonthly');
  }
  get accountName(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('accountName');
  }
  get accountNumber(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('accountNumber');
  }
  get finInstitution(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('finInstitution');
  }
  get branch(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('branch');
  }

  // Getting radio-button values in step 3 for checking if has institution
  get institutionAnswer(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('otherInstitutions');
  }

  // Getting dropdown values in step 3 for collateral facility
  get collateralType(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2.collateral');
    return items.get('collateralType');
  }
  get titleDeed(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2.collateral');
    return items.get('titleDeed');
  }
  get rentRates(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2.collateral');
    return items.get('rentRates');
  }
  get sharesList(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2.collateral');
    return items.get('sharesList');
  }
  get logBook(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2.collateral');
    return items.get('logBook');
  }
  get cheque(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2.collateral');
    return items.get('cheque');
  }
  get insuranceDoc(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2.collateral');
    return items.get('insuranceDoc');
  }

  get businessCert(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('businessCert');
  }
  get certIMAA(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('certIMAA');
  }
  get businessRegCert(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('businessRegCert');
  }
  get latestCR12(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('latestCR12');
  }
  get businessKraCopy(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('businessKraCopy');
  }
  get directorIdKra(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('directorIdKra');
  }
  get latestAnnualReturns(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('latestAnnualReturns');
  }
  get bankStatement(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('bankStatement');
  }
  get invoiceCopy(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('invoiceCopy');
  }
  get auditedManagementAccounts(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('auditedManagementAccounts');
  }
  get projections(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('projections');
  }
  get ageingReports(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('ageingReports');
  }
  get idCopy(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('idCopy');
  }
  get kraCopy(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('kraCopy');
  }
  get passportImg(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('passportImg');
  }
  get paySlips(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('paySlips');
  }
  get letterIntro(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('letterIntro');
  }
  get letterUndertaking(): AbstractControl {
    const items = this.loanApplicationForm.get('loanApplicationArray.2');
    return items.get('letterUndertaking');
  }

  // Dynamically adding FormControls
  // tslint:disable-next-line: typedef
  get addedInstitutionsForm() {
    return this.loanApplicationForm.get('loanApplicationArray.2').get('addedInstitution') as FormArray;
  }

  // Add another financial institution
  // tslint:disable-next-line: typedef
  addInstitution() {
    const institution = this.fb.group({
      addedFinancialInstitution: [],
      addedLoanAmount: [],
      addedOutstandingBalance: [],
      addedLoanType: [],
      addedRepaymentMonthly: [],
    });

    this.addedInstitutionsForm.push(institution);
  }

  // Remove added financial institution
  // tslint:disable-next-line: typedef
  removeInstitution(i) {
    this.addedInstitutionsForm.removeAt(i);
  }

  /**
   * Adding another account based on user
   */

  // Dynamically adding FormControls
  // tslint:disable-next-line: typedef
  get addedAccountsForm() {
    return this.loanApplicationForm.get('loanApplicationArray.2').get('addedAccount') as FormArray;
  }

  // Add another another account event handler
  // tslint:disable-next-line: typedef
  addAccount() {
    const account = this.fb.group({
      addedAccountName: [],
      addedAccountNumber: [],
      addedAccountFinancialInstitution: [],
      addedAccountBranch: [],
    });

    this.addedAccountsForm.push(account);
  }

  // Remove added account
  // tslint:disable-next-line: typedef
  removeAccount(i) {
    this.addedAccountsForm.removeAt(i);
  }

  /**
   * Adds an extra section for extra applicant to upload
   * the required documents
   * Automatically adds another applicant document section in the 4th step
   * The addApplicantDocumentSection and removeAddedDocumentSection methods get
   * invoked by the addApplicant and removeApplicant methods respectively
   */

  // Dynamically adding FormControls
  // tslint:disable-next-line: typedef
  get addedApplicantDocumentsForm() {
    return this.loanApplicationForm.get('loanApplicationArray.2').get('addedApplicantDocs') as FormArray;
  }

  // tslint:disable-next-line: typedef
  addApplicantDocumentSection() {
    const app = this.fb.group({
      addedApplicantIdCopy: [],
      addedApplicantKraCopy: [],
      addedApplicantImg: [],
      addedApplicantPayslips: [],
      addedApplicantLetterIntro: [],
      addedApplicantLetterUndertaking: [],
    });
    this.addedApplicantDocumentsForm.push(app);
  }

  // tslint:disable-next-line: typedef
  removeAddedDocumentSection(i) {
    this.addedApplicantDocumentsForm.removeAt(i);
  }

  /**
   * Add another collateral section
   */

  // Dynamically adding FormControls
  // tslint:disable-next-line: typedef
  get addedCollateralForm() {
    return this.loanApplicationForm.get('loanApplicationArray.2.collateral').get('addedCollateral') as FormArray;
  }

  // Add another collateral required document section
  // tslint:disable-next-line: typedef
  addCollateral() {
    const collateralAdd = this.fb.group({
      addedCollateralType: [],
      addedTitleDeed: [],
      addedRentRates: [],
      addedSharesList: [],
      addedLogBook: [],
      addedCheque: [],
      addedInsuranceDoc: []
    });

    this.addedCollateralForm.push(collateralAdd);
  }

  // Remove added collateral
  // tslint:disable-next-line: typedef
  removeCollateral(i) {
    this.addedCollateralForm.removeAt(i);
  }


  // ########################################## START OF CONSTRUCTOR #########################################

  constructor(private fb: FormBuilder, private loanFeaturesService: LoanfeatureService,
              private afAuth: AngularFireAuth, private storage: AngularFireStorage, private db: AngularFirestore,
              private router: Router, private snackBar: MatSnackBar) {

    // Getting ID of signed in user
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.currentUserID = user.uid;
        // console.log(user.uid);
      }
    });

    this.loansCollection = this.db.collection('loans', ref => ref.orderBy('addedAt', 'asc'));

    this.loanApplicationForm = this.fb.group({
      loanApplicationArray: this.fb.array([

        this.fb.group({
          loanType: ['', [Validators.required]],
          businessDetails: this.fb.group({
            businessName: ['', [Validators.required]],
            ownershipType: ['', [Validators.required]],
            regNumber: ['', Validators.required],
            regDate: ['', Validators.required],
            industry: ['', Validators.required],
            kraPin: ['', Validators.required],
            vatNumber: ['', Validators.required],
            employeesNum: ['', Validators.required],
            yearsInBusiness: ['', Validators.required],
            turnOverRange: ['', Validators.required],
            projectedTurnOver: ['', Validators.required],
            dateFrom: ['', Validators.required],
            dateTo: ['', Validators.required],
            sales: [''],
            costOfSlaes: [''],
            operatingExp: [''],
            grossProfit: ['', Validators.required],
            netProfitBeforeTax: ['', Validators.required],
            stockValue: [''],
            tradeDebtor: [''],
            tradeCreditor: [''],
            otherDebts: [''],
            capitalPaid: [''],
            countriesOperating: ['', Validators.required],
            address: this.fb.group({
              building: ['', Validators.required],
              street: ['', Validators.required],
              county: ['', Validators.required],
              postalAddress: ['', Validators.required],
              postalCode: ['', Validators.required]
            }),
            contactName: ['', Validators.required],
            contactEmail: ['', [Validators.required, Validators.email]],
            contactMobile: ['', Validators.required],
          }),
          personalDetails: this.fb.group({
            company: ['', Validators.required],
            companyAddress: this.fb.group({
              building: ['', Validators.required],
              street: ['', Validators.required],
              county: ['', Validators.required],
              postalAddress: ['', Validators.required],
              postalCode: ['', Validators.required]
            }),
            employmentNature: ['', Validators.required],
            contractYears: ['', Validators.required],
            earnings: ['', Validators.required]
          })
        }),

        this.fb.group({
          title: ['', Validators.required],
          firstName: ['', Validators.required],
          middleName: [''],
          lastName: ['', Validators.required],
          gender: ['', Validators.required],
          maritalStatus: ['', Validators.required],
          id: ['', Validators.required],
          kraPin: ['', Validators.required],
          nationality: ['', Validators.required],
          dob: ['', Validators.required],
          socialMedia: [''],

          addedApplicants: this.fb.array([]),
        }),

        this.fb.group({
          loanFacilityType: ['', Validators.required],
          borrowAmount: ['', Validators.required],
          loanPurpose: ['', Validators.required],
          repaymentPeriod: ['', Validators.required],
          otherInstitutions: ['', Validators.required],
          financialInstitution: ['', Validators.required],
          loanAmount: ['', Validators.required],
          outStandingBalance: ['', Validators.required],
          loanType: ['', Validators.required],
          repaymentAmountMonthly: ['', Validators.required],

          addedInstitution: this.fb.array([]),

          accountName: ['', Validators.required],
          accountNumber: ['', Validators.required],
          finInstitution: ['', Validators.required],
          branch: ['', Validators.required],

          addedAccount: this.fb.array([]),

          // Collateral Type requirements
          collateral: this.fb.group({
            collateralType: ['', Validators.required],
            titleDeed: ['', Validators.required],
            rentRates: ['', Validators.required],
            sharesList: ['', Validators.required],
            logBook: ['', Validators.required],
            cheque: ['', Validators.required],
            insuranceDoc: ['', Validators.required],

            addedCollateral: this.fb.array([]),
          }),

          addedApplicantDocs: this.fb.array([]),

          // Business Loan Type Requirements
          businessCert: ['', Validators.required],
          certIMAA: ['', Validators.required],
          businessRegCert: ['', Validators.required],
          latestCR12: ['', Validators.required],
          businessKraCopy: ['', Validators.required],
          directorIdKra: ['', Validators.required],
          latestAnnualReturns: [''],
          bankStatement: ['', Validators.required],
          invoiceCopy: ['', Validators.required],
          auditedManagementAccounts: ['', Validators.required],
          projections: [''],
          ageingReports: [''],

          // Personal Loan Type Requirements
          idCopy: ['', Validators.required],
          kraCopy: ['', Validators.required],
          passportImg: ['', Validators.required],
          paySlips: ['', Validators.required],
          letterIntro: ['', Validators.required],
          letterUndertaking: ['', Validators.required]

        })
      ]),
    });

    this.incomeDetailsForm = this.fb.group({
      loanType: ['', [Validators.required]],
      businessDetails: this.fb.group({
        businessName: ['', [Validators.required]],
        ownershipType: ['', [Validators.required]],
        regNumber: ['', Validators.required],
        regDate: ['', Validators.required],
        industry: ['', Validators.required],
        kraPin: ['', Validators.required],
        vatNumber: ['', Validators.required],
        employeesNum: ['', Validators.required],
        yearsInBusiness: ['', Validators.required],
        turnOverRange: ['', Validators.required],
        projectedTurnOver: ['', Validators.required],
        dateFrom: ['', Validators.required],
        dateTo: ['', Validators.required],
        sales: [''],
        costOfSlaes: [''],
        operatingExp: [''],
        grossProfit: ['', Validators.required],
        netProfitBeforeTax: ['', Validators.required],
        stockValue: [''],
        tradeDebtor: [''],
        tradeCreditor: [''],
        otherDebts: [''],
        capitalPaid: [''],
        countriesOperating: ['', Validators.required],
        address: this.fb.group({
          building: ['', Validators.required],
          street: ['', Validators.required],
          county: ['', Validators.required],
          postalAddress: ['', Validators.required],
          postalCode: ['', Validators.required]
        }),
        contactName: ['Kenyan', Validators.required],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactMobile: ['', Validators.required],
      }),
      personalDetails: this.fb.group({
        company: ['', Validators.required],
        companyAddress: this.fb.group({
          building: ['', Validators.required],
          street: ['', Validators.required],
          county: ['', Validators.required],
          postalAddress: ['', Validators.required],
          postalCode: ['', Validators.required]
        }),
        employmentNature: ['', Validators.required],
        contractYears: ['', Validators.required],
        earnings: ['', Validators.required]
      })
    });

    this.applicantDetailsForm = this.fb.group({
      title: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      id: ['', Validators.required],
      kraPin: ['', Validators.required],
      nationality: ['', Validators.required],
      dob: ['', Validators.required],
      socialMedia: [''],

      addedApplicants: this.fb.array([]),
    });

    this.loanDetailsForm = this.fb.group({
      loanFacilityType: ['', Validators.required],
      borrowAmount: ['', Validators.required],
      loanPurpose: ['', Validators.required],
      repaymentPeriod: ['', Validators.required],
      otherInstitutions: ['', Validators.required],
      financialInstitution: ['', Validators.required],
      loanAmount: ['', Validators.required],
      outStandingBalance: ['', Validators.required],
      loanType: ['', Validators.required],
      repaymentAmountMonthly: ['', Validators.required],

      addedInstitution: this.fb.array([]),

      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      finInstitution: ['', Validators.required],
      branch: ['', Validators.required],

      addedAccount: this.fb.array([]),

      // Collateral Type requirements
      collateral: this.fb.group({
        collateralType: ['', Validators.required],
        titleDeed: ['', Validators.required],
        rentRates: ['', Validators.required],
        sharesList: ['', Validators.required],
        logBook: ['', Validators.required],
        cheque: ['', Validators.required],
        insuranceDoc: ['', Validators.required],

        addedCollateral: this.fb.array([]),
      }),

      addedApplicantDocs: this.fb.array([]),

      // Business Loan Type Requirements
      businessCert: ['', Validators.required],
      certIMAA: ['', Validators.required],
      businessRegCert: ['', Validators.required],
      latestCR12: ['', Validators.required],
      businessKraCopy: ['', Validators.required],
      directorIdKra: ['', Validators.required],
      latestAnnualReturns: [''],
      bankStatement: ['', Validators.required],
      invoiceCopy: ['', Validators.required],
      auditedManagementAccounts: ['', Validators.required],
      projections: [''],
      ageingReports: [''],

      // Personal Loan Type Requirements
      idCopy: ['', Validators.required],
      kraCopy: ['', Validators.required],
      passportImg: ['', Validators.required],
      paySlips: ['', Validators.required],
      letterIntro: ['', Validators.required],
      letterUndertaking: ['', Validators.required]
    });

    // Subscribing to the value of the form control (radio-button) using the loanType getter method
    this.subs = this.loanType.valueChanges
      .subscribe(checkedValue => {
        if (checkedValue === 'Business Loan') {
          this.isBusiness = true;
        } else {
          this.isBusiness = false;
        }
      });

    // Subscribing to the value of the form control (radio-button) using the employmentNature getter method
    this.subs = this.employmentNature.valueChanges
      .subscribe(checkedValue => {
        if (checkedValue === 'Contract Worker') {
          this.isContract = true;
        } else {
          this.isContract = false;
        }
      });

    // Subscribing to the value of the form control (dropdown) in the 4th step using the loanTypeFacility getter method
    this.subs = this.loanTypeFacility.valueChanges
      .subscribe(checkedValue => {
        if (checkedValue === 'Business Loan') {
          this.isBusinessLoan = true;
        } else {
          this.isBusinessLoan = false;
        }
      });

    // Subscribing to the value of the form control (radio-button) in the 4th step using the institutionAnswer getter method
    this.subs = this.institutionAnswer.valueChanges
      .subscribe(checkedValue => {
        if (checkedValue === 'Yes') {
          this.hasOtherInstitution = true;
        } else {
          this.hasOtherInstitution = false;
        }
      });

    // Subscribing to the value of the form control (drop-down) in the 4th step using the collateralType getter method
    this.subs = this.collateralType.valueChanges
      .subscribe(checkedValue => {
        if (checkedValue === 'Land') {
          this.land = true;

          this.propertyBuildings = false;
          this.shares = false;
          this.chattels = false;
          this.postDated = false;
          this.insurance = false;
        }

        else if (checkedValue === 'Property and Buildings') {
          this.propertyBuildings = true;

          this.land = false;
          this.shares = false;
          this.chattels = false;
          this.postDated = false;
          this.insurance = false;
        }
        else if (checkedValue === 'Shares') {
          this.shares = true;

          this.land = false;
          this.propertyBuildings = false;
          this.chattels = false;
          this.postDated = false;
          this.insurance = false;
        }
        else if (checkedValue === 'Chattels /Charge over Movable Assets (Motor Vehicle, Machinery, other assets)') {
          this.chattels = true;

          this.shares = false;
          this.land = false;
          this.propertyBuildings = false;
          this.postDated = false;
          this.insurance = false;
        }

        else if (checkedValue === 'Post Dated Cheques') {
          this.postDated = true;

          this.shares = false;
          this.land = false;
          this.propertyBuildings = false;
          this.chattels = false;
          this.insurance = false;

        }
        else if (checkedValue === 'Insurance Policies') {
          this.insurance = true;

          this.shares = false;
          this.land = false;
          this.propertyBuildings = false;
          this.chattels = false;
          this.postDated = false;
        }

        else {
          this.land = false;
          this.propertyBuildings = false;
          this.shares = false;
          this.debentures = false;
          this.chattels = false;
          this.postDated = false;
          this.insurance = false;
        }
      });

    // Getting data from Loan Features API
    this.subs = this.loanFeaturesService.getLoanFeatures()
      .subscribe(
        data => this.loanFeature = data,
        error => this.errorMsg = error
      );

    this.personalSubs = this.loanFeaturesService.getPersonalLoanFeatures()
      .subscribe(
        data => this.personalLoanFeature = data,
        error => this.errorMsg = error
      );

    this.businessSubs = this.loanFeaturesService.getBusinessLoanFeatures()
      .subscribe(
        data => this.businessLoanFeature = data,
        error => this.errorMsg = error
      );


    // console.log(this.loanApplicationForm.value);
    // For testing the access of form controls nested inside: FormGroup -> FormArray -> FormGroup
    // console.log(this.loanApplicationForm.get('loanApplicationArray.3.collateral').get('collateralType'));
  }
  // ################################################### END OF CONSTRUCTOR ######################################################

  // tslint:disable-next-line: typedef
  getLoans() {
    this.loans = this.loansCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as LoanApplication;
        data.loanId = a.payload.doc.id;
        return data;
      });
    }));
    return this.loans;
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

  /**
   * Gets the files picked by the filepicker and adds them to an array
   * Loops through the array and uploads the files to Firebase Storage & Cloud Firestore
   * @param file dropped/picked files from filepicker input
   */
  // tslint:disable-next-line: typedef
  onDrop(file: File, id: string) {
    this.file = file;
    this.getBase64(this.file);
    const userId = this.currentUserID;
    const addedOn = this.formatDate(new Date());
    const loanId = id;

    this.currentLoanSummaryView = true;

    // The storage path
    const path = `loanapplicationfiles/${Date.now()}_${this.file.name}`; // adding timestamp to the path since it will cover uniqueness

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file); // However it's not an observable we can subscribe to

    // Progress Monitoring
    this.percentage = this.task.percentageChanges();

    // Observable that emits an object every few hundred milliseconds with a bunch of data about the file upload
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add({ downloadURL: this.downloadURL, path, userId, addedOn, loanId });
      })
    );
  }


  /**
   * Will tell us whether or not an upload is currently running
   * ~ makes it easier to disable pause & cancel buttons based on the status of the upload
   * @param snapshot observable
   */
  // tslint:disable-next-line: typedef
  isActive(snapshot) {
    return snapshot.state === 'running'
      && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  /**
   * Checking state change for autosave feature on loan application form
   * @param e event change
   */
  // tslint:disable-next-line: typedef
  changeHandler(e) {
    this.state = e;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.personalSubs.unsubscribe();
    this.businessSubs.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      // this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
