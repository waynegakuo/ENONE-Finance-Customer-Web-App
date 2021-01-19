import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DateFormatterService } from './../../../../shared/date-formatter/date-formatter.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl, Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LetterOfOfferService {
  date;

  refNo;
  contactName;
  customerCompanyName;
  customerCompanyPostalAddress;
  city;
  country;
  salutation;
  mainCompanyName;
  mainCompanyBankAccName;
  mainCompanyBankAccNumber;
  paybillNumber;
  guarantorMale;
  guarantorFemale;
  loanType;
  numericalLoanAmount;
  wordsLoanAmount;
  numericalTotalLoanAmount;
  wordsTotalLoanAmount;
  loanPurpose;
  loanRepaymentTerm;
  loanInterestRate;
  penaltyInterestRate;
  processFeeRate;
  thirdPartyChangesFeeAmount;
  creditOfficerName;
  CEOName;

  constructor(private dateFormatter: DateFormatterService, private fb: FormBuilder) {
    this.date = this.dateFormatter.formatDate(new Date());
  }

  letterOfOfferForm = this.fb.group({
    refNo: ['', Validators.required],
    contactName: ['', Validators.required],
    customerCompanyName: ['', Validators.required],
    customerCompanyPostalAddress: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    salutation: ['', Validators.required],
    mainCompanyName: ['', Validators.required],
    mainCompanyBankAccName: ['', Validators.required],
    mainCompanyBankAccNumber: ['', Validators.required],
    paybillNumber: ['', Validators.required],
    guarantorMale: ['', Validators.required],
    guarantorFemale: ['', Validators.required],
    loanType: ['', Validators.required],
    numericalLoanAmount: ['', Validators.required],
    wordsLoanAmount: ['', Validators.required],
    numericalTotalLoanAmount: ['', Validators.required],
    wordsTotalLoanAmount: ['', Validators.required],
    loanPurpose: ['', Validators.required],
    loanRepaymentTerm: ['', Validators.required],
    loanInterestRate: ['', Validators.required],
    penaltyInterestRate: ['', Validators.required],
    processFeeRate: ['', Validators.required],
    thirdPartyChangesFeeAmount: ['', Validators.required],
    creditOfficerName: ['', Validators.required],
    CEOName: ['', Validators.required],
  });

  // tslint:disable-next-line: typedef
  generatePdf() {

    // Get values from form
    this.refNo = this.letterOfOfferForm.controls.refNo.value;
    this.contactName = this.letterOfOfferForm.controls.contactName.value;
    this.customerCompanyName = this.letterOfOfferForm.controls.customerCompanyName.value;
    this.customerCompanyPostalAddress = this.letterOfOfferForm.controls.customerCompanyPostalAddress.value;
    this.city = this.letterOfOfferForm.controls.city.value;
    this.country = this.letterOfOfferForm.controls.country.value;
    this.salutation = this.letterOfOfferForm.controls.salutation.value;
    this.mainCompanyName = this.letterOfOfferForm.controls.mainCompanyName.value;
    this.mainCompanyBankAccName = this.letterOfOfferForm.controls.mainCompanyBankAccName.value;
    this.mainCompanyBankAccNumber = this.letterOfOfferForm.controls.mainCompanyBankAccNumber.value;
    this.paybillNumber = this.letterOfOfferForm.controls.paybillNumber.value;
    this.guarantorMale = this.letterOfOfferForm.controls.guarantorMale.value;
    this.guarantorFemale = this.letterOfOfferForm.controls.guarantorFemale.value;
    this.loanType = this.letterOfOfferForm.controls.loanType.value;
    this.numericalLoanAmount = this.letterOfOfferForm.controls.numericalLoanAmount.value;
    this.wordsLoanAmount = this.letterOfOfferForm.controls.wordsLoanAmount.value;
    this.numericalTotalLoanAmount = this.letterOfOfferForm.controls.numericalTotalLoanAmount.value;
    this.wordsTotalLoanAmount = this.letterOfOfferForm.controls.wordsTotalLoanAmount.value;
    this.loanPurpose = this.letterOfOfferForm.controls.loanPurpose.value;
    this.loanRepaymentTerm = this.letterOfOfferForm.controls.loanRepaymentTerm.value;
    this.loanInterestRate = this.letterOfOfferForm.controls.loanInterestRate.value;
    this.penaltyInterestRate = this.letterOfOfferForm.controls.penaltyInterestRate.value;
    this.processFeeRate = this.letterOfOfferForm.controls.processFeeRate.value;
    this.thirdPartyChangesFeeAmount = this.letterOfOfferForm.controls.thirdPartyChangesFeeAmount.value;
    this.creditOfficerName = this.letterOfOfferForm.controls.creditOfficerName.value;
    this.CEOName = this.letterOfOfferForm.controls.CEOName.value;

    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }

  // tslint:disable-next-line: typedef
  getDocumentDefinition() {
    return {
      content: [
        {
          columns: [
            [
              {
                text: 'Company logo',
              },
              {
                text: 'Company postal address'
              },
              {
                text: 'City, Country'
              }
            ],

          ],
        },
        {
          text: 'PRIVATE & CONFIDENTIAL',
          style: 'ref'
        },
        {
          text: this.date,
          style: 'block'
        },
        {
          text: `Our Ref: ${this.refNo} `,
          style: 'block'
        },
        {
          columns: [
            [
              {
                text: `${this.contactName}`
              },
              {
                text: `${this.customerCompanyName}`
              },
              {
                text: `${this.customerCompanyPostalAddress}`
              },
              {
                text: `${this.city}, ${this.country}`
              }
            ]
          ]
        },
        {
          text: `Dear ${this.salutation}`,
          style: 'block'
        },
        {
          text: 'RE: CREDIT FACILITY',
          style: 'ref'
        },
        {
          text: `We refer to your request for a loan facility and are pleased to advise you that ${this.mainCompanyName} (the “Lender  ”) has agreed to offer you ${this.customerCompanyName} (hereinafter referred to as the “Borrower”) and sanction the following facility(ies) on the terms and conditions set out in this offer letter (the “Offer Letter”).The Conditions and Other Terms constitute an integral part of this Offer Letter.`,
          style: 'block'
        },
        {
          text: '1.	THE GUARANTORS',
          style: 'list'
        },
        {
          text: `a)	Mr. ${this.guarantorMale}`,
          style: 'list_2'
        },
        {
          text: `b)	Mrs. ${this.guarantorFemale}`,
          style: 'list_2'
        },
        {
          text: '2.  FACILITIES SANCTIONED',
          style: 'list'
        },
        {
          style: 'list_2',
          columns: [
            [
              {
                text: 'Nature of Facilities',
                style: 'ref'
              },
              {
                text: `${this.loanType}`
              },
              {
                text: '(NEW)',
                bold: true
              },
              {
                text: 'TOTAL FACILITIES',
                style: 'block'
              }
            ],
            [
              {
                text: 'Limit Sanctioned',
                decoration: 'underline',
                bold: true,
                alignment: 'center',
                margin: [0, 10, 0, 5]
              },
              {
                text: `KES. ${this.numericalLoanAmount}`,
                style: 'attendance'
              },
              {
                text: `(Kenya Shillings ${this.wordsLoanAmount})`
              },
              {
                text: `KES. ${this.numericalTotalLoanAmount}`,
                style: 'attendance'
              },
              {
                text: `(Kenya Shillings ${this.wordsTotalLoanAmount})`
              }
            ]
          ]
        },
        {
          text: '(Hereinafter referred to as the (“Facilities”).',
          style: 'list_2'
        },
        {
          text: '3. PURPOSE',
          style: 'list'
        },
        {
          text: `To support ${this.loanPurpose} requirements`,
          style: 'list_2'
        },
        {
          text: '4. DRAWDOWN',
          style: 'list'
        },
        {
          text: '4.1	Each drawing is subject to the prior fulfillment of all terms and conditions of this Offer Letter.',
          style: 'list_2'
        },
        {
          text: '4.2	Every notice under this paragraph is irrevocable and shall be signed by the duly authorized signatories in accordance with the mandate given to the Lender by the Borrower.',
          style: 'list_2'
        },
        {
          text: '5.	CONDITIONS OF Disbursement/Drawdown',
          style: 'list'
        },
        {
          text: '5.1	The Lender shall not be obliged to make any disbursements of the Facility until it has received:-',
          style: 'list_2'
        },
        {
          text: 'a.	in a form and substance satisfactory to it, the documents, items and evidence specified in this Offer Letter and the Conditions (or the Lender having waived any one or more of them in its absolute discretion and subject to any condition(s) it may think fit); and',
          style: 'list_3'
        },
        {
          text: 'b.	payment in cleared funds of all fees, expenses and other sums under this Offer Letter to the extent due and payable.',
          style: 'list_3'
        },
        {
          text: '5.2	The Lenders obligations to make any disbursements of the Facility is also conditional upon:-',
          style: 'list_2'
        },
        {
          text: 'a)	the Borrower’s compliance at the relevant time with the terms and conditions of, and there being no breach of or default under this Offer Letter, the Conditions or any security or other document referred to in Clause 9 of this Offer Letter (“Security Documents”); and',
          style: 'list_3'
        },
        {
          text: 'b)	The representations and warranties set out in paragraph 17 below being true and correct on and as of each such time as if each was made with respect to the facts and circumstances at such time.',
          style: 'list_3'
        },
        {
          text: '6.	TERM AND REPAYMENT OF THE FACILITY',
          style: 'list'
        },
        {
          text: `Each ${this.loanType} is payable in ${this.loanRepaymentTerm}.`,
          style: 'block'
        },
        {
          text: 'The payment to be made on or before the same numerical day of disbursement of the loan in the calendar month following the month on which the loan is disbursed.  In the event that the due date of payment falls on a non-Lendering day, the repayment shall be due on the following Lendering day.',
          style: 'block'
        },
        {
          text: '7.	INTEREST',
          style: 'list'
        },
        {
          text: '7.1	Interest shall be paid as follows:-',
          style: 'list_2'
        },
        {
          text: `Facility Type 1: ${this.loanType} The Borrower shall pay interest to the Lender at a rate of ${this.loanInterestRate}. `,
          style: 'list_3'
        },
        {
          text: '7.2	Interest shall be computed on daily cleared balances on the basis of a [365 day year] .In the event of it not being punctually paid, such interest shall be compounded monthly.  Interest shall fall due on the last working day of each calendar month.',
          style: 'list_2'
        },
        {
          text: '7.3	The statement of the Lender as to the rate, mode or amount of interest payable shall in the absence of manifest error, be conclusive.',
          style: 'list_2'
        },
        {
          text: `7.4	Penal Interest - If any sum payable by the Borrower with respect to the Facilities is not paid when due, the Borrower shall (without prejudice to the exercise by the Lender of any other right or remedy in favour of the Lender) pay to the Lender interest at the rate of one per cent per Month(${this.penaltyInterestRate} per Month), over and above the then subsisting rate of interest payable by the Borrower under paragraph 7.1 above on all monies due with effect from the date of the same becoming due until actual repayment of such monies in full (together with accrued interest) (the “Penal Rate”).  The Borrower acknowledges and agrees that the Penal Rate represents a reasonable pre-estimate of the loss likely to be suffered by the Lender in funding mismatch due to the default of the Borrower`,
          style: 'list_2'
        },
        {
          text: '7.5	The interest referred to in paragraphs 7.4 above shall be calculated and paid in the same manner as set out in paragraph 7.2 above.',
          style: 'list_2'
        },
        {
          text: '8.	 COMMISSION/ CHARGES/FEES',
          style: 'list'
        },
        {
          text: '8.1	Management Fee/ Processing Fees',
          style: 'list_2'
        },
        {
          text: `A ${this.processFeeRate} Management fees of KES ${this.thirdPartyChangesFeeAmount} one off shall apply. These funds to be banked in the ${this.mainCompanyName} at ${this.mainCompanyBankAccName} - ${this.mainCompanyBankAccNumber} before facility draw down. Option to use Safaricom pay bill number ${this.paybillNumber} and quote account number ${this.mainCompanyBankAccNumber} is available.`,
          style: 'list_3'
        },
        {
          text: '8.2 Other Costs/Fees',
          style: 'list_2'
        },
        {
          text: '8.2.1	The Borrower shall pay to the Lender in cleared funds on demand all expenses, including legal expenses, incurred by the Lender in connection with the negotiation and preparation of this Offer Letter and the Security Documents, and will reimburse to the Lender on demand all expenses incurred by the Lender in suing for or recovering of any sum due to the Lender under this Offer Letter or the Security Documents.',
          style: 'list_3'
        },
        {
          text: '8.2.2	The Borrower shall pay in cleared funds all stamp duties and other taxes (if any) to which this Offer Letter and the Security Documents may be subject.',
          style: 'list_3'
        },
        {
          text: '8.2.3	Costs for recovering any sum due to the Lender under this letter of offer shall be payable by the Borrower and may vary depending on the amount outstanding and realization process followed, however the Lender will furnish the Borrower with an indicative cost breakdown at the time when recovery commences, for ease of reference',
          style: 'list_3'
        },
        {
          text: '8.2.4	The costs of carrying out credit checks on the Borrower, its shareholder/directors/officials as well as any guarantor or third party security provider with a duly licensed Credit Reference Bureau or any other relevant credit reference agency, may also be borne by the Borrower (at the Lender’s discretion), the cost whereof shall be advised by the Lender prior to execution of this offer letter.',
          style: 'list_3'
        },
        {
          text: '8.2.5	All costs of Transfer of funds will be borne by the borrower',
          style: 'list_3'
        },
        {
          text: '9.	SECURITY',
          style: 'list'
        },
        {
          text: '9.1	The Facility shall be secured by the following:-',
          style: 'list_2'
        },
        {
          text: 'Securities to be obtained',
          style: 'list_alt'
        },
        {
          text: '1.	Fill in the securities/collateral as per loan application',
          style: 'list_3'
        },
        {
          text: '10.	EXISTING LIABILITY',
          style: 'list'
        },
        {
          text: 'Fill in other bank loan information',
          style: 'list_2'
        },
        {
          text: '11. ATTORNEY',
          style: 'list'
        },
        {
          text: 'The Borrower hereby irrevocably appoints the Lender to be the Attorney of the Borrower and in the name and on behalf of the Borrower to execute and do any assurances, acts and things which the Borrower ought to execute and do under the covenants and agreements herein contained and generally to use the name of the Borrower in the exercise of all or any of the powers hereby or by law conferred on the Lender.',
          style: 'list_2'
        },
        {
          text: '12.	INSURANCE & OTHER RECURRING CHARGES',
          style: 'list'
        },
        {
          text: '12.1	All insurable assets forming part of the Lenders security shall be comprehensively insured against theft, damage, fire & allied perils for the full value thereof during the tenure of the Facilities by an insurance company lawfully licensed to provide the specific type of insurance, with the interest of the Lender being duly noted on the policy document. The Lender However reserves the right to object to any insurance company on reasonable grounds.',
          style: 'list_2'
        },
        {
          text: '12.2	Upon the expiry of any insurance cover, the Borrower shall within seven (7) days of such expiry deliver to the Lender the relevant renewal advice failing which the Lender shall be at liberty to effect such insurance at the Borrower’s cost without further reference to the Borrower and debit the Borrower’s account with any amount paid by the Lender.',
          style: 'list_2'
        },
        {
          text: '12.3	All charges including but not limited to advocates fees, valuation fees, stamp duty, Land Rent, Land Rates, Auctioneers Fees or other fees, costs and other incidental expenses incurred by the Lender in connection with administration of the facility herein, completion and or perfection of security documentation with respect to the facility herein and any expenses incurred for recovery shall be borne by the Borrower.  The services shall be rendered by the Lender’s approved service providers and the fees shall be settled by the borrower.',
          style: 'list_2'
        },
        {
          text: '13.	CONTINUING OBLIGATIONS',
          style: 'list'
        },
        {
          text: '13.1	Accounts and Other Information Required',
          style: 'list_2'
        },
        {
          text: 'The Borrower shall as part of its continuous obligations provide to the Lender:-',
          style: 'list_3'
        },
        {
          text: '13.1.1	Management accounts and cash flow projections as and when requested by the Lender.',
          style: 'list_3'
        },
        {
          text: '13.1.2	Copies of Bank statement as and when requested by the Lender.',
          style: 'list_3'
        },
        {
          text: '13.1.3	such other information and in such form as may be required by the Lender from time to time relating to the Borrower’s finances and operations.',
          style: 'list_3'
        },
        {
          text: '14	REPRESENTATIONS AND WARRANTIES',
          style: 'list'
        },
        {
          text: 'The Borrower represents and warrants to the Lender that:-',
          style: 'list_2'
        },
        {
          text: '14.1	all information submitted by the Borrower to the Lender, inter alia, on his/her/its financial position, net worth, details of indebtedness, presents accurately its state of affairs and the financial position of the Borrower as at such date;',
          style: 'list_2'
        },
        {
          text: '14.2	every consent, authorization or approval of governmental or public bodies or authorities required in connection with the execution, delivery, validity or enforceability of this Offer Letter or the performance by the Borrower of its obligations hereunder or required to make this Offer Letter admissible in evidence has, where applicable, been obtained and is in full force and effect; and',
          style: 'list_2'
        },
        {
          text: '14.3	there has been no material adverse change in the financial position of the Borrower from that set forth in the application requesting the Lender for the Facilities and in the annexures thereto (if any).',
          style: 'list_2'
        },
        {
          text: '15.  OTHER COVENANTS',
          style: 'list'
        },
        {
          text: '15.1 The Borrower confirms and agrees that the Lender may at any time and at its sole discretion, carry out credit checks on the Borrower .In the event of default on the Borrower’s part of any of its obligations under this Offer Letter or under the Security, the Lender may at its sole discretion supply such information as it deems appropriate to the Credit Reference Bureau or any other relevant credit reference agency.  This information may be used by other Lenders or institutions in assessing credit applications and for occasional debt tracing and fraud prevention.',
          style: 'list_2'
        },
        {
          text: '15.2	The Borrower shall not resort to any borrowings from any other source without the Lenders prior consent in writing.',
          style: 'list_2'
        },
        {
          text: '15.3	Each of the provisions of this Offer Letter is severable and distinct from the others and if at any time one or more of such provisions is or becomes, illegal or unenforceable the validity, legality and enforceability of the remaining provisions hereof shall not in any way be affected or impaired.',
          style: 'list_2'
        },
        {
          text: '16	ACCEPTANCE',
          style: 'list'
        },
        {
          text: '16.2	Notwithstanding any provisions in this Offer Letter (including the expiry date of the Facility), the provisions of this Offer Letter shall, unless the Lender in its sole discretion decides otherwise by notice in writing to the Borrower, or by an executed addendum to this Offer Letter, continue in full force and effect until any renewal, extension or replacement Offer Letter has been offered to and accepted by the Borrower.',
          style: 'list_2'
        },
        {
          text: '16.3	Kindly signify your acceptance of the offer contained in the Offer Letter by completing the Form of Acceptance and signing each page (including the Conditions and other Annexures) and returning to us the duplicate within 7 days from the date of the Offer Letter, failing which this offer may be revoked at the sole discretion of the Lender and without further reference to the Borrower.',
          style: 'list_2'
        },
        {
          text: 'Edge Three Sixty Limited reserves the right to withdraw the offer should the security documents indicated in clause 9 herein not be executed within 60 days from the date hereof, and in any event if drawdown is not commenced within 90 days from the date of this letter of offer.',
          style: 'list_2'
        },
        {
          text: '16.5	The Lender recommends that you seek independent legal and/or financial advise on the contents and implications of this Offer Letter, prior to execution. Any queries or clarifications required will be addressed by a designated Lender official at the Borrower’s request.',
          style: 'list_2'
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: 'Yours faithfully,'
              },
              {
                text: `For and on behalf of ${this.mainCompanyName}`
              }
            ]
          ]
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: `${this.creditOfficerName}`
              }
            ],
            [
              {
                text: `${this.CEOName}`,
                style: 'attendance'
              }
            ]
          ]
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: 'Authorised Signatory',
                style: 'ref'
              },
              {
                text: 'Signature witnessed by:-'
              },
              {
                style: 'block',
                columns: [
                  [
                    {
                      text: 'Name:'
                    },
                    {
                      text: 'Signature:'
                    },
                    {
                      text: 'Date:'
                    }
                  ]
                ]
              }
            ],
            [
              {
                text: 'Authorised Signatory',
                style: 'ref'
              },
              {
                text: 'Signature witnessed by:-'
              },
              {
                style: 'block',
                columns: [
                  [
                    {
                      text: 'Name:'
                    },
                    {
                      text: 'Signature:'
                    },
                    {
                      text: 'Date:'
                    }
                  ]
                ]
              }
            ]
          ]
        },
        {
          text: 'FORM OF ACCEPTANCE',
          bold: true,
          fontSize: 15,
          alignment: 'center',
          margin: [0, 50, 0, 20],
          decoration: 'underline'
        },
        {
          text: `We, Mr. ${this.guarantorMale} and Mrs. ${this.guarantorFemale}, confirm that we have read and understood the contents of the Offer Letter.`,
          style: 'block'
        },
        {
          text: 'We hereby accept the offer for the Facility on the terms and conditions contained in the Offer Letter and agree to the creation of Lien referred to in paragraph 9 herein.',
          style: 'block'
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: `Signed by ${this.contactName}`
              },
              {
                text: 'in the presence of:								)'
              },
              {
                text: '														)'
              },
              {
                text: '														)'
              },
              {
                text: '														)'
              },
              {
                text: 'Advocate 											)'
              }
            ],
            [
              {
                text: '_______________________',
                bold: true
              },
              {
                text: 'Signature'
              }
            ]
          ]
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: 'Signed by 	……………………………'
              },
              {
                text: 'in the presence of:								)'
              },
              {
                text: '														)'
              },
              {
                text: '														)'
              },
              {
                text: '														)'
              },
              {
                text: 'Advocate 											)'
              }
            ]
          ]
        },
        {
          text: 'Date of Acceptance:					',
          style: 'block'
        }
      ],
      // PDF Metadata
      info: {
        title: 'LETTER OF OFFER',
        author: 'EDGE THREE-SIXTY',
        subject: 'LETTER OF OFFER',
        keywords: 'LETTER, LOAN APPLICATION, OFFER',
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
          bold: true,
          margin: [20, 10, 0, 0]
        },
        list_2: {
          margin: [40, 5, 0, 0]
        },
        list_alt: {
          margin: [40, 5, 0, 0],
          bold: true,
          decoration: 'underline'
        },
        list_3: {
          margin: [80, 5, 0, 0]
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
