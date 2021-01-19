import { DateFormatterService } from './../../../../shared/date-formatter/date-formatter.service';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FinalDemandService {
  date;

  referenceNo;
  companyName;
  postalAddress;
  city;
  country;
  dateInArrears;
  loanAccountNumber;
  arrears;
  totalOutstanding;
  interestRate;
  creditOfficer;

  constructor(private dateFormatter: DateFormatterService, private fb: FormBuilder) {
    this.date = this.dateFormatter.formatDate(new Date());
  }

  // Final Demand Letter Form
  finalDemandForm = this.fb.group({
    referenceNo: ['', Validators.required],
    companyName: ['', Validators.required],
    postalAddress: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    dateInArrears: ['', Validators.required],
    loanAccountNumber: ['', Validators.required],
    arrears: ['', Validators.required],
    totalOutstanding: ['', Validators.required],
    interestRate: ['', Validators.required],
    creditOfficer: ['', Validators.required]
  });

  // tslint:disable-next-line: typedef
  generatePdf() {

    // Obtaining values from the form
    this.referenceNo = this.finalDemandForm.controls.referenceNo.value;
    this.companyName = this.finalDemandForm.controls.companyName.value;
    this.postalAddress = this.finalDemandForm.controls.postalAddress.value;
    this.city = this.finalDemandForm.controls.city.value;
    this.country = this.finalDemandForm.controls.country.value;
    this.dateInArrears = this.finalDemandForm.controls.dateInArrears.value;
    this.loanAccountNumber = this.finalDemandForm.controls.loanAccountNumber.value;
    this.arrears = this.finalDemandForm.controls.arrears.value;
    this.totalOutstanding = this.finalDemandForm.controls.totalOutstanding.value;
    this.interestRate = this.finalDemandForm.controls.interestRate.value;
    this.creditOfficer = this.finalDemandForm.controls.creditOfficer.value;

    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }

  // tslint:disable-next-line: typedef
  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'Final Demand Letter',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },

        {
          columns: [
            [
              {
                text: '(MFI LOGO)'
              },
              {
                text: '(MFI POSTAL ADDRESS)'
              },
              {
                text: '(MFI CITY, COUNTRY)'
              }
            ]
          ]
        },

        {
          text: `OUR REF: ${this.referenceNo}`,
          style: 'ref'
        },
        {
          text: this.date,
          style: 'date'
        },
        {
          style: 'recepient',
          columns: [
            [
              {
                text: 'Directors,'
              },
              {
                text: `${this.companyName}`
              },
              {
                text: `${this.postalAddress}`
              },
              {
                text: `${this.city}, ${this.country}`
              }
            ],
            [
              {
                text: 'By Mail Delivery',
                style: 'mailDelivery'
              }
            ]
          ]
        },
        {
          text: 'Dear Customer,',
          style: 'block'
        },
        {
          text: 'RE: FINAL DEMAND LETTER',
          style: 'header'
        },

        // Body of the letter
        {
          text: 'We refer to the above matter.',
          style: 'block'
        },
        {
          text: `Kindly note that as of ${this.dateInArrears} your account was in arrears as indicated below:`,
          style: 'block'
        },
        // Arrears Table
        this.getArrearsTable(),
        {
          text: 'We further advise that your default herein constitutes a breach of the terms and conditions of the letter of offer, further details whereof are well within your knowledge.',
          style: 'block'
        },
        {
          text: 'Take notice therefore that (FOONDI TECH NAME) hereby demands that you settle the outstanding arrears within the next fourteen (14) days from the date hereof, failure whereof we shall be constrained to commence legal action to recover the outstanding debt without further reference to you and at your own peril with regard to costs and other consequences ensuing there from.',
          style: 'block'
        },
        {
          text: 'Also note that we will not hesitate to list you as a defaulter with the Credit Reference Bureau.',
          style: 'block'
        },
        {
          text: 'Yours faithfully,',
          style: 'block',
        },
        {
          style: 'signOff',
          columns: [
            [
              {
                text: `${this.creditOfficer}`
              },
              {
                text: 'Credit & Administration Manager'
              }
            ]
          ]
        }

      ],
      // PDF Metadata
      info: {
        title: 'FINAL DEMAND LETTER',
        author: 'EDGE THREE-SIXTY',
        subject: 'FINAL DEMAND LETTER',
        keywords: 'FINAL, LOAN APPLICATION, LETTER',
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
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
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
          margin: [0, 20, 0, 10]
        }
      }
    };
  }

  // tslint:disable-next-line: typedef
  getArrearsTable() {
    return {
      table: {
        widths: ['*', '*', '*', '*', '*'],
        body: [
          [{
            text: 'ACCOUNT NUMBER',
            style: 'tableHeader'
          },
          {
            text: 'CUR',
            style: 'tableHeader'
          },
          {
            text: 'ARREARS',
            style: 'tableHeader'
          },
          {
            text: 'TOTAL OUTSTANDING',
            style: 'tableHeader'
          },
          {
            text: 'INTEREST P.M.',
            style: 'tableHeader'
          },
          ],
          // Table content
          [
            {
              text: `${this.loanAccountNumber}`,
              style: 'tableContent'
            },
            {
              text: 'KES',
              style: 'tableContent'
            },
            {
              text: `${this.arrears}`,
              style: 'tableContent'
            },
            {
              text: `${this.totalOutstanding}`,
              style: 'tableContent'
            },
            {
              text: `${this.interestRate}`,
              style: 'tableContent'
            },
          ]
        ]
      }
    };
  }
}
