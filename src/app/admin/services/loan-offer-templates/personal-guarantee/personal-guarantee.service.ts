import { DateFormatterService } from './../../../../shared/date-formatter/date-formatter.service';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl, Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PersonalGuaranteeService {
  date;
  day;
  month;
  year;

  refNo;
  mainCompanyCEOName;
  mainCompanyName;
  mainCompanyPostalAddress;
  city;
  country;
  salutation;
  customerCompanyName;
  guaranteeAmount;
  guarantorName;
  guarantorIdNo;
  guarantorPostalAddress;
  customerLoanAmount;


  constructor(private dateFormatter: DateFormatterService, private fb: FormBuilder) {
    this.date = this.dateFormatter.formatDate(new Date());
    this.day = this.dateFormatter.formatDay(new Date());
    this.month = this.dateFormatter.formatMonth(new Date());
    this.year = this.dateFormatter.formatYear(new Date());
  }

  personalGuaranteeForm = this.fb.group({
    refNo: ['', Validators.required],
    mainCompanyCEOName: ['', Validators.required],
    mainCompanyName: ['', Validators.required],
    mainCompanyPostalAddress: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    salutation: ['', Validators.required],
    customerCompanyName: ['', Validators.required],
    guaranteeAmount: ['', Validators.required],
    guarantorName: ['', Validators.required],
    guarantorIdNo: ['', Validators.required],
    guarantorPostalAddress: ['', Validators.required],
    customerLoanAmount: ['', Validators.required],
  });

  // tslint:disable-next-line: typedef
  generatePdf() {

    // Get values from the form
    this.refNo = this.personalGuaranteeForm.controls.refNo.value;
    this.mainCompanyCEOName = this.personalGuaranteeForm.controls.mainCompanyCEOName.value;
    this.mainCompanyName = this.personalGuaranteeForm.controls.mainCompanyName.value;
    this.mainCompanyPostalAddress = this.personalGuaranteeForm.controls.mainCompanyPostalAddress.value;
    this.city = this.personalGuaranteeForm.controls.city.value;
    this.country = this.personalGuaranteeForm.controls.country.value;
    this.salutation = this.personalGuaranteeForm.controls.salutation.value;
    this.customerCompanyName = this.personalGuaranteeForm.controls.customerCompanyName.value;
    this.guaranteeAmount = this.personalGuaranteeForm.controls.guaranteeAmount.value;
    this.guarantorName = this.personalGuaranteeForm.controls.guarantorName.value;
    this.guarantorIdNo = this.personalGuaranteeForm.controls.guarantorIdNo.value;
    this.guarantorPostalAddress = this.personalGuaranteeForm.controls.guarantorPostalAddress.value;
    this.customerLoanAmount = this.personalGuaranteeForm.controls.customerLoanAmount.value;

    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }

  // tslint:disable-next-line: typedef
  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'DIRECTOR’S PERSONAL GUARANTEE',
          bold: true,
          fontSize: 15,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
              {
                text: `REF: ${this.refNo}`
              },
              {
                text: `DATE: ${this.date}`
              }
            ]
          ]
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: `${this.mainCompanyCEOName}`
              },
              {
                text: `${this.mainCompanyName}`
              },
              {
                text: `${this.mainCompanyPostalAddress}`
              },
              {
                text: `${this.city}, ${this.country}`
              }
            ]
          ]
        },
        {
          text: `Dear ${this.salutation},`,
          style: 'block'
        },
        {
          text: `GUARANTEE FOR KSHS ${this.guaranteeAmount} FOR LOANS ADVANCED TO ${this.customerCompanyName}`,
          style: 'ref'
        },
        {
          text: `IN CONSIDERATION of the Lender from time to time making or continuing loans or advances or granting any financial or other accommodation or granting time for so long as it may think fit to, or forbearing to sue or demand immediate payment from, ${this.customerCompanyName} (the Principal Debtor), I, ${this.guarantorName}, of ID No. ${this.guarantorIdNo} and of ${this.guarantorPostalAddress}, unconditionally and irrevocably, undertake and AGREE WITH ${this.mainCompanyName} (the Lender) as follows:`,
          style: 'block'
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: '1. I GUARANTEE to you the payment by the Principal Debtor for all the Loans and advances that you may from time to time at their request supply to them subject to the maximum liability herein stated.',
                style: 'list'
              },
              {
                text: `2. My liability under this Guarantee shall not exceed the sum of Kenya Shillings ${this.customerLoanAmount} only. (“The maximum liability”).`,
                style: 'list'
              },
              {
                text: '3. I undertake to pay to you within Thirty (30) days on your first written demand without cavil or argument all that which you declare to be due to you from the Principal Debtor under this Guarantee with due observance to my maximum liability herein stated.',
                style: 'list'
              },
              {
                text: '4. A statement of account of the Principal Debtor signed as correct by your duly authorized officer shall be conclusive evidence of the indebtedness of the Principal Debtor to you.',
                style: 'list',
              },
              {
                text: '5. You may at any time in your absolute discretion without discharging or impairing our liability under this Guarantee:',
                style: 'list'
              },
              {
                text: 'i.	Grant or refuse further credit or supply of Loans and advances to the Principal Debtor;',
                style: 'list_2'
              },
              {
                text: 'ii. Grant to the Principal Debtor time or other indulgence;',
                style: 'list_2'
              },
              {
                text: 'iii. Accept payment from the Principal Debtor in cash or by means of negotiable instruments.',
                style: 'list_2'
              },
              {
                text: '6. This Guarantee shall be a continuing guarantee to you, within the limit aforesaid, for the whole debt that shall be contracted by you in respect of Loans and advances granted to the Principal Debtor subject to our right of revocation herein contained.',
                style: 'list'
              },
              {
                text: '7.	We shall be entitled to revoke this Guarantee at any time upon issuance of One (1) month’s written notice to you, but such revocation shall not affect our liability in respect of monies owing or incurred by the Principal Debtor prior to the expiration of the notice period. The notice of revocation shall be sent by email and a confirmation copy by registered post.',
                style: 'list'
              },
              {
                text: '8.	To the extent that no further liability shall be incurred by the Guarantor under this Guarantee, following revocation referred to in clause 7 above, you shall cease to make any further disbursements of Loans and advances to the Principal Debtor under this Guarantee and in reliance on this Guarantee on the happening of any of the following events:',
                style: 'list'
              },
              {
                text: 'i. Your lodging of a claim with me for payment under this Guarantee;',
                style: 'list_2'
              },
              {
                text: 'ii. Your receipt from me of a notice of revocation of this Guarantee;',
                style: 'list_2'
              },
              {
                text: 'iii. If such further disbursements shall cause the maximum liability of the Guarantee to be exceeded.',
                style: 'list_2'
              },
              {
                text: `9. Any claim hereunder shall be made to you in writing at any time after the date of default by the Principal Debtor but not later than Ninety (90) days after the date of expiry of this Guarantee. The claims shall be addressed to ${this.guarantorName} of ID No. ${this.guarantorIdNo} and of ${this.guarantorPostalAddress} (the Guarantor).`,
                style: 'list'
              },
              {
                text: '10. No failure or delay by you in exercising any right or remedy hereunder shall operate as a waiver thereof.',
                style: 'list'
              },
              {
                text: '11. This Guarantee is governed by and interpreted in accordance with the Laws of Kenya.',
                style: 'list'
              },
              {
                text: '12. This Guarantee is valid for a period of 6 Months from the date hereof.',
                style: 'list'
              },
              {
                text: `IN WITNESS WHEREOF the duly authorized signatory of ${this.customerCompanyName} has duly executed this Guarantee on this ${this.day} day of ${this.month} ${this.year}`,
                style: 'list',
                margin: [0, 10, 0, 0]
              },
              {
                text: '__________________',
                style: 'signSection'
              },
              {
                text: 'AUTHORIZED SIGNATORY',
                style: 'signatory'
              },
              {
                text: 'NAME: ……………………….. (ID No…………………..)',
                style: 'signatory'
              }
            ]
          ]
        }

      ],
      // PDF Metadata
      info: {
        title: 'PERSONAL GUARANTEE',
        author: 'EDGE THREE-SIXTY',
        subject: 'PERSONAL GUARANTEE',
        keywords: 'PERSONAL, LOAN APPLICATION, GUARANTEE',
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
        }
      }
    };
  }

}
