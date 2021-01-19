import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DateFormatterService } from './../../../../shared/date-formatter/date-formatter.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BoardResolutionService {
  date;
  day;
  month;
  year;

  location;
  companyName;
  borrower;
  chairman;
  secretary;
  referenceNo;
  offerLetter;
  lenderName;
  director1;
  director2;
  loanExposure;
  creditLoanExposure;
  vehicleRegistration;
  propertyNo;
  directorSec;

  constructor(private dateFormatter: DateFormatterService, private fb: FormBuilder) {
    this.date = this.dateFormatter.formatDate(new Date());
    this.day = this.dateFormatter.formatDay(new Date());
    this.month = this.dateFormatter.formatMonth(new Date());
    this.year = this.dateFormatter.formatYear(new Date());
  }

  boardResolutionForm = this.fb.group({
    location: ['', Validators.required],
    companyName: ['', Validators.required],
    chairman: ['', Validators.required],
    secretary: ['', Validators.required],
    borrower: ['', Validators.required],
    referenceNo: ['', Validators.required],
    offerLetter: ['', Validators.required],
    lenderName: ['', Validators.required],
    director1: ['', Validators.required],
    director2: ['', Validators.required],
    loanExposure: ['', Validators.required],
    creditLoanExposure: ['', Validators.required],
    vehicleRegistration: ['', Validators.required],
    propertyNo: ['', Validators.required],
    director_sec: ['', Validators.required]
  });



  // tslint:disable-next-line: typedef
  generatePdf() {

    // Obtaining values from the form
    this.location = this.boardResolutionForm.controls.location.value;
    this.companyName = this.boardResolutionForm.controls.companyName.value;
    this.borrower = this.boardResolutionForm.controls.borrower.value;
    this.chairman = this.boardResolutionForm.controls.chairman.value;
    this.secretary = this.boardResolutionForm.controls.secretary.value;
    this.referenceNo = this.boardResolutionForm.controls.referenceNo.value;
    this.offerLetter = this.boardResolutionForm.controls.offerLetter.value;
    this.lenderName = this.boardResolutionForm.controls.lenderName.value;
    this.director1 = this.boardResolutionForm.controls.director1.value;
    this.director2 = this.boardResolutionForm.controls.director2.value;
    this.loanExposure = this.boardResolutionForm.controls.loanExposure.value;
    this.creditLoanExposure = this.boardResolutionForm.controls.creditLoanExposure.value;
    this.vehicleRegistration = this.boardResolutionForm.controls.vehicleRegistration.value;
    this.propertyNo = this.boardResolutionForm.controls.propertyNo.value;
    this.directorSec = this.boardResolutionForm.controls.director_sec.value;

    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }

  // tslint:disable-next-line: typedef
  getDocumentDefinition() {
    return {
      content: [
        {
          text: '(TO BE TYPED ON THE COMPANY’S LETTER HEAD)',
          bold: true,
          fontSize: 15,
          margin: [0, 0, 0, 20]
        },
        {
          text: `EXTRACT OF THE MINUTES of a meeting of the Board of Directors of ${this.companyName} (the “Company”) duly convened, constituted and held at the offices of the Company at ${this.location} on ${this.day} day of ${this.month}, ${this.year}`,
          style: 'block'
        },
        {
          columns: [
            [
              {
                text: 'Present:',
                decoration: 'underline',
                margin: [0, 10, 0, 0]
              },
              {
                text: ' ',
                style: 'block'
              },
              {
                text: ' ',
                style: 'block'
              },
              {
                text: 'In Attendance',
                decoration: 'underline',
                margin: [0, 10, 0, 5]
              }
            ],
            [
              {
                text: `${this.chairman}`,
                style: 'attendance'
              },
              {
                text: `${this.director1}`,
                style: 'attendance'
              },
              {
                text: `${this.director2}`,
                style: 'attendance'
              },
              {
                text: `${this.secretary}`,
                style: 'attendance'
              },
            ],
            [
              {
                text: 'Chairman',
                style: 'attendees'
              },
              {
                text: 'Director',
                style: 'attendees'
              },
              {
                text: 'Director',
                style: 'attendees'
              },
              {
                text: 'Company Secretary',
                style: 'attendees'
              },
            ]
          ],
        },
        {
          text: `The Chairperson informed the meeting that ${this.borrower} (the “Borrower”) had by a letter of offer Ref: ${this.referenceNo} dated ${this.offerLetter}. (the “Offer Letter”) been granted a credit facility by ORGANIZATION NAME (the “Lender”) as more particularly set out in the Offer Letter.`,
          style: 'block'
        },
        {
          text: '1.	The Chairperson informed the meeting that the terms of credit facility being granted included inter alia that the Company issues the following securities as security for the repayment of the credit Facilities together with interest and other amounts:-',
          style: 'list'
        },
        {
          text: 'Securities',
          bold: true,
          margin: [0, 20, 0, 10]
        },
        {
          text: `1. Directors Personal guarantees by ${this.director1}. and ${this.director2}(Names of the Directors)`,
          style: 'list'
        },
        {
          text: `2.	Fresh Board resolution authorizing borrowing of Ksh. ${this.loanExposure} and issuance of securities therein.
          (Total Loan Exposure)`,
          style: 'list'
        },
        {
          text: `3.	Joint Registration of Motor Vehicle Registration No ${this.vehicleRegistration}`,
          style: 'list'
        },
        {
          text: '4.	Supplemental Debenture over the Company’s Assets',
          style: 'list'
        },
        {
          text: `5.	Credit life insurance for Kes ${this.loanExposure} (Loan Exposure)`,
          style: 'list'
        },
        {
          text: `6.	Legal Charge over Property LR NO. ${this.propertyNo}`,
          style: 'list'
        },
        {
          text: 'The Chairperson reported that the Company had received a request from the Borrower to create the Security Documents.',
          style: 'block'
        },
        {
          text: '2.	IT WAS RESOLVED as follows: ',
          style: 'list'
        },
        {
          text: '7.1	That the terms and conditions of the Security Documents be and are hereby approved and confirmed.',
          style: 'list_2'
        },
        {
          text: '7.2	That the Company undertakes to perform and/or secure the various agreements undertakings and transactions as required to be undertaken and performed under the Security Documents.',
          style: 'list_2'
        },
        {
          text: `7.3	That the common seal of the Company be affixed to the Security Documents and that ${this.director1} a Director and ${this.directorSec} a Director/Company Secretary (Names of Directors) be and are authorised to witness the affixing of the Common Seal of the Company to the Security Documents and also execute other documents relating to the Banking Facilities on behalf of the Company.`,
          style: 'list_2'
        },
        {
          text: '7.4	That the Security Documents be duly presented to the relevant registries for registration in accordance with the applicable statutes.',
          style: 'list_2'
        },
        {
          text: '7.5	That the Security Documents and all other relevant documents to be issued by the Company in accordance with the terms of the Credit Facility Letter be forthwith delivered to the Lending institution as security for the Credit Facilities.',
          style: 'list_2'
        },
        {
          text: '7.6	That the foregoing Resolutions do not in any way limit or affect the instructions to the Credit institution contained in any mandate given by the Company.',
          style: 'list_2'
        },
        {
          text: '7.7	That the Secretary be directed to arrange for the filing with the Registrar of Companies of all necessary returns (if any) consequent upon the business dealt with at this meeting.',
          style: 'list_2'
        },
        {
          text: 'IT IS HEREBY CERTIFIED that the above is a true extract from the Minutes of the Meeting of the Board of Directors of the Company, that a quorum of Directors was present throughout the meeting, that the resolutions set forth above were duly passed in accordance with and comply with the Memorandum and Articles of Association and Regulations of the Company and the Companies Act and that the resolutions will not infringe any restrictions on borrowing of monies and/or creation and issuance of any security or guarantees or otherwise affecting the Company or the Board and that no event of default as set out in the Security Documents referred to above has at the date hereof occurred or is foreseeable.',
          style: 'block'
        },
        {
          text: `Dated this ${this.day} day of ${this.month}, ${this.year}`,
          style: 'block'
        },
        {
          text: 'Sealed with the common seal of)',
          style: 'block'
        },
        {
          text: `${this.companyName} LIMITED (Company Name)`,
          bold: true
        },
        {
          text: 'in the presence of:-			)',
          style: 'block'
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: 'Director				)'
              },
              {
                text: `Name: ${this.director1}					)`
              },
              {
                text: 'Signature:				)'
              }
            ]
          ]
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: 'Director/Secretary			)'
              },
              {
                text: `Name: ${this.directorSec}					)`
              },
              {
                text: 'Signature:				)'
              }
            ]
          ]
        }
      ],
      // PDF Metadata
      info: {
        title: 'BOARD RESOLUTION LETTER',
        author: 'EDGE THREE-SIXTY',
        subject: 'BOARD RESOLUTION LETTER',
        keywords: 'BOARD, LOAN APPLICATION, RESOLUTION',
      },
      // Styling
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        ref: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 5],
          decoration: 'underline'
        },
        date: {
          margin: [0, 10, 0, 10]
        },
        paragraphs: {
          margin: [0, 10, 0, 10]
        },
        recepient: {
          margin: [0, 10, 0, 10]
        },
        block: {
          margin: [0, 10, 0, 5]
        },
        list: {
          margin: [20, 0, 0, 0]
        },
        list_2: {
          margin: [40, 5, 0, 0]
        },
        mailDelivery: {
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          alignment: 'center'
        },
        tableContent: {
          alignment: 'center'
        },
        signOff: {
          margin: [20, 20, 0, 10]
        },
        signSection: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        signatory: {
          margin: [0, 10, 0, 10],
          bold: true
        },
        signedBy: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
          decoration: 'underline'
        },
        attendance: {
          alignment: 'centre',
          margin: [0, 10, 0, 5]
        },
        attendees: {
          alignment: 'right',
          bold: true,
          margin: [0, 10, 0, 5]
        }
      }
    };
  }
}
