import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DateFormatterService } from 'src/app/shared/date-formatter/date-formatter.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LenderAddendumToMasterService {
  date;
  day;
  month;
  year;

  lenderName;
  lenderIdNo;
  lenderKRAPin;
  lenderPostalAddress;
  lenderPhysicalAddress;
  borrowerName;
  borrowerRegNo;
  borrowerKRAPin;
  borrowerPostalAddress;
  borrowerPhysicalAddress;
  financeLoanAmount;
  financeLoanDuration;
  financeInterestRate;
  financeStartDate;
  financeEndDate;
  signLocation;
  borrowerCEOName;

  constructor(private dateFormatter: DateFormatterService, private fb: FormBuilder) {
    this.date = this.dateFormatter.formatDate(new Date());
    this.day = this.dateFormatter.formatDay(new Date());
    this.month = this.dateFormatter.formatMonth(new Date());
    this.year = this.dateFormatter.formatYear(new Date());
  }

  // Lender Addendum to Master Agreement Form
  lenderAddendumForm = this.fb.group({
    lenderName: ['', Validators.required],
    lenderIdNo: ['', Validators.required],
    lenderKRAPin: ['', Validators.required],
    lenderPostalAddress: ['', Validators.required],
    lenderPhysicalAddress: ['', Validators.required],
    borrowerName: ['', Validators.required],
    borrowerRegNo: ['', Validators.required],
    borrowerKRAPin: ['', Validators.required],
    borrowerPostalAddress: ['', Validators.required],
    borrowerPhysicalAddress: ['', Validators.required],
    borrowerCEOName: ['', Validators.required],
    financeLoanAmount: ['', Validators.required],
    financeLoanDuration: ['', Validators.required],
    financeInterestRate: ['', Validators.required],
    financeStartDate: ['', Validators.required],
    financeEndDate: ['', Validators.required],
    signLocation: ['', Validators.required],
  });

  // tslint:disable-next-line: typedef
  generatePdf() {
    this.lenderName = this.lenderAddendumForm.controls.lenderName.value;
    this.lenderIdNo = this.lenderAddendumForm.controls.lenderIdNo.value;
    this.lenderKRAPin = this.lenderAddendumForm.controls.lenderKRAPin.value;
    this.lenderPostalAddress = this.lenderAddendumForm.controls.lenderPostalAddress.value;
    this.lenderPhysicalAddress = this.lenderAddendumForm.controls.lenderPhysicalAddress.value;
    this.borrowerName = this.lenderAddendumForm.controls.borrowerName.value;
    this.borrowerRegNo = this.lenderAddendumForm.controls.borrowerRegNo.value;
    this.borrowerKRAPin = this.lenderAddendumForm.controls.borrowerKRAPin.value;
    this.borrowerPostalAddress = this.lenderAddendumForm.controls.borrowerPostalAddress.value;
    this.borrowerPhysicalAddress = this.lenderAddendumForm.controls.borrowerPhysicalAddress.value;
    this.borrowerCEOName = this.lenderAddendumForm.controls.borrowerCEOName.value;
    this.financeLoanAmount = this.lenderAddendumForm.controls.financeLoanAmount.value;
    this.financeLoanDuration = this.lenderAddendumForm.controls.financeLoanDuration.value;
    this.financeInterestRate = this.lenderAddendumForm.controls.financeInterestRate.value;
    this.financeStartDate = this.lenderAddendumForm.controls.financeStartDate.value;
    this.financeEndDate = this.lenderAddendumForm.controls.financeEndDate.value;
    this.signLocation = this.lenderAddendumForm.controls.signLocation.value;

    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }

  // tslint:disable-next-line: typedef
  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'ADDENDUM TO THE SHORT FORM FACILITY AGREEMENT',
          bold: true,
          fontSize: 15,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: `Original Short Form Facility Agreement Signed on ${this.date}`,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'Short Form Facility Agreement entered into between',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'LENDER',
          style: 'ref'
        },
        this.getLenderTable(),
        {
          text: 'BORROWER',
          style: 'ref'
        },
        this.getBorrowerTable(),
        {
          text: `The Lender and Borrower are parties to a Short Term Facility Agreement date ${this.date} that in conjunction with this Addendum to the Short Term Facility constitute an agreement whereby the Lender agrees to Lend and the Borrower agrees to Borrow a loan as detailed here under, subject to the terms and conditions of the Short Term Facility Agreement and this Addendum.`,
          style: 'block'
        },
        {
          text: 'FINANCE DETAIL',
          style: 'ref'
        },
        this.getFinanceTable(),
        {
          text: `IN THE WITNESS WHEREOF this Agreement has been duly signed and executed at ${this.signLocation}. On day Of ${this.day} ${this.month}, ${this.year} by or on behalf of the parties.`,
          style: 'block'
        },
        {
          text: 'SIGNED BY:',
          style: 'signedBy'
        },
        this.signTable(),
      ],
      // PDF Metadata
      info: {
        title: 'LENDER ADDENDUM TO MASTER AGREEMENT',
        author: 'EDGE THREE-SIXTY',
        subject: 'LENDER ADDENDUM TO MASTER AGREEMENT',
        keywords: 'LENDER, LOAN APPLICATION, ADDENDUM',
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
        },
        signedBy: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
          decoration: 'underline'
        }
      }
    };
  }

  // tslint:disable-next-line: typedef
  getLenderTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'NAME',
              style: 'tableHeader'
            },
            {
              text: `${this.lenderName}`,
            },
          ],
          [
            {
              text: 'ID NUMBER',
              style: 'tableHeader'
            },
            {
              text: `${this.lenderIdNo}`,
            },
          ],
          [
            {
              text: 'KRA PIN NUMBER',
              style: 'tableHeader'
            },
            {
              text: `${this.lenderKRAPin}`,
            },
          ],
          [
            {
              text: 'POSTAL ADDRESS',
              style: 'tableHeader'
            },
            {
              text: `${this.lenderPostalAddress}`,
            },
          ],
          [
            {
              text: 'PHYSICAL ADDRESS',
              style: 'tableHeader'
            },
            {
              text: `${this.lenderPhysicalAddress}`,
            },
          ],
        ]
      }
    };
  }

  // tslint:disable-next-line: typedef
  getBorrowerTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'NAME',
              style: 'tableHeader'
            },
            {
              text: `${this.borrowerName}`,
            },
          ],
          [
            {
              text: 'REGISTRATION NUMBER',
              style: 'tableHeader'
            },
            {
              text: `${this.borrowerRegNo}`,
            },
          ],
          [
            {
              text: 'KRA PIN NUMBER',
              style: 'tableHeader'
            },
            {
              text: `${this.borrowerKRAPin}`,
            },
          ],
          [
            {
              text: 'POSTAL ADDRESS',
              style: 'tableHeader'
            },
            {
              text: `${this.borrowerPostalAddress}`,
            },
          ],
          [
            {
              text: 'PHYSICAL ADDRESS',
              style: 'tableHeader'
            },
            {
              text: `${this.borrowerPhysicalAddress}`,
            },
          ],
        ]
      }
    };
  }
  // tslint:disable-next-line: typedef
  getFinanceTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'LOAN AMOUNT',
              style: 'tableHeader'
            },
            {
              text: `${this.financeLoanAmount}`,
            },
          ],
          [
            {
              text: 'LOAN DURATION',
              style: 'tableHeader'
            },
            {
              text: `${this.financeLoanDuration} months`,
            },
          ],
          [
            {
              text: 'INTEREST RATE',
              style: 'tableHeader'
            },
            {
              text: `${this.financeInterestRate}`,
            },
          ],
          [
            {
              text: 'START DATE',
              style: 'tableHeader'
            },
            {
              text: `${this.financeStartDate}`,
            },
          ],
          [
            {
              text: 'END DATE',
              style: 'tableHeader'
            },
            {
              text: `${this.financeEndDate}`,
            },
          ],
        ]
      }
    };
  }

  // tslint:disable-next-line: typedef
  signTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [{
            text: 'LENDER',
            style: 'tableHeader'
          },
          {
            text: 'BORROWER',
            style: 'tableHeader'
          },
          ],
          // Table content
          [
            {
              text: `NAME: ${this.lenderName}`,
              style: 'tableContent'
            },
            {
              text: `NAME: ${this.borrowerName} (MAIN ORGANIZATION)`,
              style: 'tableContent'
            },
          ],
          [
            {
              text: 'SIGNATURE: ',
              style: 'tableContent'
            },
            {
              text: `NAME: ${this.borrowerCEOName} (MAIN ORGANIZATION CEO)`,
              style: 'tableContent'
            },
          ],
          [
            {
              text: `DATE: ${this.date}`,
              style: 'tableContent'
            },
            {
              text: `DATE: ${this.date}`,
              style: 'tableContent'
            },
          ]
        ]
      }
    };
  }
}
