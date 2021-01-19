import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DateFormatterService } from './../../../../shared/date-formatter/date-formatter.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LenderLoanMasterService {
  date;
  day;
  month;
  year;

  lenderName;
  borrowerCompanyName;
  borrowerCompanyPostalAddress;
  lenderIdNo;
  lenderPostalAddress;

  constructor(private dateFormatter: DateFormatterService, private fb: FormBuilder) {
    this.date = this.dateFormatter.formatDate(new Date());
    this.day = this.dateFormatter.formatDay(new Date());
    this.month = this.dateFormatter.formatMonth(new Date());
    this.year = this.dateFormatter.formatYear(new Date());
  }

  lenderLoanForm = this.fb.group({
    lenderName: ['', Validators.required],
    borrowerCompanyName: ['', Validators.required],
    borrowerCompanyPostalAddress: ['', Validators.required],
    lenderIdNo: ['', Validators.required],
    lenderPostalAddress: ['', Validators.required]
  });

  // tslint:disable-next-line: typedef
  generatePdf() {

    // Getting values from the form
    this.lenderName = this.lenderLoanForm.controls.lenderName.value;
    this.borrowerCompanyName = this.lenderLoanForm.controls.borrowerCompanyName.value;
    this.borrowerCompanyPostalAddress = this.lenderLoanForm.controls.borrowerCompanyPostalAddress.value;
    this.lenderIdNo = this.lenderLoanForm.controls.lenderIdNo.value;
    this.lenderPostalAddress = this.lenderLoanForm.controls.lenderPostalAddress.value;

    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }

  // tslint:disable-next-line: typedef
  getDocumentDefinition() {
    return {
      content: [
        {
          text: `DATED THIS ${this.day} DAY OF ${this.month} ${this.year}`,
          bold: true,
          fontSize: 17,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'MASTER SHORT FORM FACILITY AGREEMENT',
          bold: true,
          fontSize: 17,
          alignment: 'center',
          margin: [0, 140, 0, 20]
        },
        {
          text: 'BETWEEN',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 80, 0, 20]
        },
        {
          text: `${this.lenderName}`,
          bold: true,
          fontSize: 17,
          alignment: 'center',
          margin: [0, 90, 0, 20]
        },
        {
          text: '— and —',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 100, 0, 20]
        },
        {
          text: `${this.borrowerCompanyName}`,
          bold: true,
          fontSize: 17,
          alignment: 'center',
          margin: [0, 130, 0, 20]
        },
        {
          text: 'LOAN AGREEMENT',
          bold: true,
          decoration: 'underline',
          fontSize: 15,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: `THIS AGREEMENT IS made on the ${this.day} ${this.month} the Year ${this.year}`,
          style: 'block'
        },
        {
          text: 'Between',
          bold: true,
          margin: [0, 20, 0, 10]
        },
        {
          text: `1.	${this.lenderName} of ID NO  ${this.lenderIdNo} of ${this.lenderPostalAddress} (hereinafter referred to as “THE LENDER” which expression shall where the context so admits include his personal representatives and assigns) of the one part and,`,
          margin: [0, 0, 0, 10]
        },
        {
          text: `2.	${this.borrowerCompanyName} a limited liability company incorporated in Kenya under the provisions of the Companies Act number 17 of 2015 of the Laws of Kenya and of ${this.borrowerCompanyPostalAddress}  (hereinafter referred to as "THE BORROWER" which expression shall where the context so admits include its successors and assigns) of the second part; and`,
          margin: [0, 0, 0, 10]
        },
        {
          text: 'WHEREAS:-',
          bold: true,
          margin: [0, 0, 0, 10]
        },
        {
          text: 'A.	The Borrower is in the business of offering financial consultancy services and financial intermediating;',
          margin: [0, 0, 0, 10]
        },
        {
          text: 'B.	The Borrower is currently short of operation capital and has requested the Lender and the Lender has agreed to advance him the sum of money (hereinafter the “the Loan”) subject however to the terms and conditions of this Agreement;',
          margin: [0, 0, 0, 10]
        },
        {
          text: 'C.	 The Borrower has offered and the Lender has agreed to take as a security; (i)this Loan Agreement,',
          margin: [0, 0, 0, 10]
        },
        {
          text: 'NOW THIS AGREEMENT WITNESSETH as follows:',
          style: 'block'
        },
        {
          text: '1.	Definitions and interpretation',
          margin: [0, 0, 0, 10],
          bold: true
        },
        {
          text: '1.1	In this Agreement, unless otherwise provided:',
          style: 'block_2'
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: 'Business Day',
                bold: true
              },
              {
                text: 'Event of Default',
                bold: true,
                margin: [0, 40, 0, 0],
              },
              {
                text: 'Indebtedness',
                bold: true,
                margin: [0, 20, 0, 0],
              },
              {
                text: 'Loan',
                bold: true,
                margin: [0, 90, 0, 0],
              },
              {
                text: 'Security',
                bold: true,
                margin: [0, 40, 0, 0],
              }
            ],
            [
              {
                text: 'means a day (except Sunday and public holidays) when banks are generally open for business in Kenya;',
                margin: [0, 0, 0, 10],
              },
              {
                text: 'means any one of the events specified in clause 12.1;',
                margin: [0, 0, 0, 10],
              },
              {
                text: 'means the Loan together with all interest and all other amounts owing from time to time under this Agreement from the Borrower to the Lender and/or any obligation or liability of the Borrower owed to the Lender for the payment or repayment the loan.',
                margin: [0, 0, 0, 10],
              },
              {
                text: 'means the aggregate principal amount for the time being advanced and outstanding under this Agreement; and',
                margin: [0, 0, 0, 10],
              },
              {
                text: 'Documents listed under clause C above and/or  any other security the Lender may take  to secure the repayment of this',
                margin: [0, 0, 0, 10],
              }
            ]
          ]
        },
        {
          text: '1.2	Unless the context otherwise requires:',
          style: 'block_2'
        },
        {
          text: '1.2.1	each gender includes the others;',
          style: 'list'
        },
        {
          text: '1.2.2	the singular and the plural each includes the other;',
          style: 'list'
        },
        {
          text: '1.2.3	references to clauses, schedules or appendices are to clauses or schedules of and appendices to this Agreement;',
          style: 'list'
        },
        {
          text: '1.2.4	references to this Agreement include its Schedule [and Appendices], as amended;',
          style: 'list'
        },
        {
          text: '1.2.5	references to persons include individuals, unincorporated bodies, government entities, companies and corporations;',
          style: 'list'
        },
        {
          text: '1.2.6	including: means including without limitation and general words are not limited by example;',
          style: 'list'
        },
        {
          text: '1.2.7	clause headings do not affect their interpretation; and',
          style: 'list'
        },
        {
          text: '1.2.8	references to legislation include any modification or re-enactment thereof before the date of this Agreement.',
          style: 'list'
        },
        {
          text: '1.3	Writing includes manuscript, telexes, facsimiles, emails and any other form of communication',
          style: 'block_2'
        },
        {
          text: '2.	Conditions precedent',
          bold: true,
          style: 'block_2'
        },
        {
          text: '2.1	The Lender\'s obligation to make the Loan (or any part of it) available is conditional on receipt by the Lender of the documents and evidence described in Schedule 1 in a form and substance satisfactory to the Lender.',
          style: 'block_2'
        },
        {
          text: '2.2	The Lender\'s obligation to make the Loan (or any part of it) available is subject to the further conditions that on the actual day of drawdown;',
          style: 'block_2'
        },
        {
          text: '2.2.1	the representations and warranties set out in clause 9 to be made or repeated on those dates are true and will continue to be true immediately after making the drawing; and',
          style: 'list'
        },
        {
          text: '2.2.2	no Event of Default has occurred, is continuing or would result from making the drawing',
          style: 'list'
        },
        {
          text: '2.3	Any of the conditions precedent referred to in clauses 2.1 and 2.2 may be waived by the Lender, in whole or in part, without prejudicing the right of the Lender to require subsequent fulfillment of such conditions.',
          style: 'block_2'
        },
        {
          text: '3.	The loan',
          bold: true,
          style: 'block_2'
        },
        {
          text: '3.1	The Lender will lend to the Borrower a principal subject to the terms and conditions of this Agreement and the Addendum(s) to this Short Form Facility Agreement.',
          style: 'block_2'
        },
        {
          text: '4.	Purpose',
          bold: true,
          style: 'block_2'
        },
        {
          text: '4.1	The Borrower shall use the Loan for purposes of Borrower’s business operations only.',
          style: 'block_2'
        },
        {
          text: '4.2	The Lender is obliged to check or verify the use of any amount of the Loan by the Borrower.',
          style: 'block_2'
        },
        {
          text: '5.	Drawings',
          bold: true,
          style: 'block_2'
        },
        {
          text: '5.1	Subject to clause 2, the Borrower shall draw the entire sum of the loan on signing of this agreement or such other times the parties may agree in writing.',
          style: 'block_2'
        },
        {
          text: '6.	Interest',
          bold: true,
          style: 'block_2'
        },
        {
          text: '6.1	The Borrower shall pay interest to the Lender interest at the rate stated on the Addendum(s) to this Short Form Facility Agreement',
          style: 'block_2'
        },
        {
          text: '6.2	The Interest shall be paid and payable on a quarterly basis.',
          style: 'block_2'
        },
        {
          text: '7.	Repayment',
          bold: true,
          style: 'block_2'
        },
        {
          text: '7.1	The Borrower shall repay the entire Loan in bullet repayment at the expiry of the Loan Period as stated on the Addendum(s) to this Short Form Facility Agreement.',
          style: 'block_2'
        },
        {
          text: '7.2	The parties may however extend the term of the loan or deal with the loan on such other terms as may be agreed upon expiry of the loan term.',
          style: 'block_2'
        },
        {
          text: '8.	Prepayment',
          bold: true,
          style: 'block_2'
        },
        {
          text: '8.1	The Borrower may prepay the Loan in accordance with this clause 8.',
          style: 'block_2'
        },
        {
          text: '8.2	The amount prepaid will be agreed upon between the Borrower and the Lender.',
          style: 'block_2'
        },
        {
          text: '8.3	Prepayment must be made together with all accrued interest and all other amounts then payable under this Agreement for the amount being prepaid.',
          style: 'block_2'
        },
        {
          text: '9.	Representations and warranties',
          bold: true,
          style: 'block_2'
        },
        {
          text: '9.1	The Borrower represents and warrants to the Lender that at the date of this Agreement:',
          style: 'block_2'
        },
        {
          text: '9.1.1	it is in good standing under the laws of the Republic of Kenya;',
          style: 'list'
        },
        {
          text: '9.1.2	the Borrower has power to conduct his business as it is now being conducted;',
          style: 'list'
        },
        {
          text: '9.1.3	neither the execution and delivery of this Agreement by the Borrower nor the exercise of its rights and the performance of its obligations under this Agreement:',
          style: 'list'
        },
        {
          text: '(a)	are prohibited by law, regulation or order;',
          style: 'list_2'
        },
        {
          text: '(b)	require any approval, filing, registration or exemption; and',
          style: 'list_2'
        },
        {
          text: '(c)	are prohibited by, and do not constitute an event of default under, and do not result in an obligation to create security under, any document or arrangement to which it is a party;',
          style: 'list_2'
        },
        {
          text: '9.1.4	the borrower has power to execute this Agreement and the obligations expressed as being assumed under this Agreement constitute valid, legal, binding and enforceable obligations in accordance with their terms of the agreement;',
          style: 'list'
        },
        {
          text: '9.1.5	the Borrower is not aware of any default or breach under any law, statute, regulation, indenture, mortgage, trust deed, agreement or other instrument, arrangement, obligation or duty by which it is bound;',
          style: 'list'
        },
        {
          text: '9.1.6	the Borrower has obtained all licences, permissions and consents required for the carrying on of his business in all relevant jurisdictions and the Borrower has complied with all conditions attaching to such licences, permissions and consents;9.1.6	the Borrower has obtained all licences, permissions and consents required for the carrying on of his business in all relevant jurisdictions and the Borrower has complied with all conditions attaching to such licences, permissions and consents;',
          style: 'list'
        },
        {
          text: '9.1.7	all information supplied by the Borrower to the Lender in connection with this Agreement is true, accurate and complete in all material respects and it is not aware of any material facts or circumstances which have not been disclosed to the Lender which might, if disclosed, adversely affect the decision of a person considering whether or not to lend to the Borrower;',
          style: 'list'
        },
        {
          text: '9.1.8	the Borrower has obtained and will comply with all applicable laws and regulations and the terms of all permits, authorisations and licences required for carrying on its business.',
          style: 'list'
        },
        {
          text: '10	Undertakings',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'The Borrower will:',
          style: 'block_2'
        },
        {
          text: '10.1	not unless in the ordinary course of the Borrower\'s business without the prior written consent of the Lender incur any borrowings or indebtedness nor give any guarantee or indemnity in respect of the borrowings or indebtedness of any other person;',
          style: 'block_2'
        },
        {
          text: '10.2	not (unless with the prior written consent of the Lender) create or permit to subsist any mortgage, charge, pledge, lien, encumbrance or security interest of any kind whatsoever over the whole or part of any of his business and/or assets, both present and future;',
          style: 'block_2'
        },
        {
          text: '10.3	give the Lender notice in writing immediately upon becoming aware of the occurrence of any Event of Default or other event which, with the giving of notice and/or lapse of time and/or upon the Lender making the relevant determination, would constitute an Event of Default;',
          style: 'block_2'
        },
        {
          text: '10.4	for so long as the Indebtedness remains owing by the Borrower to the Lender, keep the Lender fully and promptly informed to such extent and in such form and detail as the Lender may from time to time reasonably require with particulars of any matters concerned with and arising out of the activities of the Borrower;',
          style: 'block_2'
        },
        {
          text: '10.5	not, without the prior written consent of the Lender and whether by a single transaction or by a series of transactions (related or not) sell, transfer, lend or otherwise dispose of (in any such case otherwise than in the ordinary course of trading) the whole or any substantial part of its business or assets or make any change in the nature of the business of the Borrower;',
          style: 'block_2'
        },
        {
          text: '10.6	conduct and carry on its business in a proper, efficient and businesslike/professional manner and not make any substantial alteration in the mode of conduct of that business and keep or cause to be kept proper books of accounts relating to such business.',
          style: 'block_2'
        },
        {
          text: '11.	Insurance obligations',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'The Borrower shall insure and keep insured all assets against such risks as the Lender may require for the specified value under such policies as the Lender may approve including, but without prejudice to the generality of the foregoing, insurance against loss or damage howsoever caused or arising and third party insurance.',
          style: 'list'
        },
        {
          text: '12. Events of default',
          bold: true,
          style: 'block_2'
        },
        {
          text: '12.1	An Event of Default occurs if:',
          style: 'block_2'
        },
        {
          text: '12.1.1	the Borrower or the Guarantor fails to perform and observe any of its/his obligations hereunder, including failures to make any payment due under this Agreement on the relevant due date;',
          style: 'list'
        },
        {
          text: '12.1.2	the Borrower or the Guarantor is unable to pay its/his debts due to bankruptcy as defined under the Bankruptcy Act (Cap 53 laws of Kenya);',
          style: 'list'
        },
        {
          text: '12.1.3	the Borrower or the Guarantor ceases or threatens to cease to carry on the whole or a substantial part of his business;',
          style: 'list'
        },
        {
          text: '12.1.4	any indebtedness of the Borrower [or the Guarantor] owed to a third party, or any indebtedness of any third party guaranteed or secured by the Borrower, entered into in the normal course of business of the Borrower, including indebtedness under any acceptance credit, bill of exchange or debenture, is not paid when due or becomes due and payable prior to the Borrower\'s date of repayment.',
          style: 'list'
        },
        {
          text: '13.	Costs',
          bold: true,
          style: 'block_2'
        },
        {
          text: '13.1	The borrower shall pay the costs relating to the preparation, negotiation and execution of this Agreement.',
          style: 'block_2'
        },
        {
          text: '14.	Currency and payments',
          bold: true,
          style: 'block_2'
        },
        {
          text: '14.1	All payments made under this Agreement shall be made in Kenya Shillings.',
          style: 'block_2'
        },
        {
          text: '14.2	If any such sum falls due for payment under this Agreement on a day which is not a Business Day, it shall be paid on the next succeeding Business Day.',
          style: 'block_2'
        },
        {
          text: '14.3	The Borrower will pay all sums payable under this Agreement in full without any set off or counterclaim and free and clear of and without any deduction or withholding from any payment to the Lender.',
          style: 'block_2'
        },
        {
          text: '14.4	If the Borrower is required to deduct or withhold any amount from any payment the Borrower will immediately pay to the Lender such additional amounts so that the Lender receives the full amount it would have received had no such deduction or withholding been required.',
          style: 'block_2'
        },
        {
          text: '15.	Set-off',
          bold: true,
          style: 'block_2'
        },
        {
          text: '15.1	The Lender may at any time set off any credit balance to which the Borrower is entitled or any other indebtedness of the Lender owing to the Borrower against any sum then payable by the Borrower to the Lender under this Agreement.',
          style: 'block_2'
        },
        {
          text: '15.2	The Borrower irrevocably authorises the Lender to purchase such other currencies as may be necessary to effect the set-off.',
          style: 'block_2'
        },
        {
          text: '15.3	The Lender will notify the Borrower of any exercise of this power of set-off.',
          style: 'block_2'
        },
        {
          text: '16.	Miscellaneous',
          bold: true,
          style: 'block_2'
        },
        {
          text: '16.1	Variation',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'Variations to this Agreement will only have effect when agreed in writing by the parties',
          style: 'list'
        },
        {
          text: '16.2	Severability',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'The unenforceability of any part of this Agreement will not affect the enforceability of any other part.',
          style: 'list'
        },
        {
          text: '16.3	Waiver',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'Unless otherwise agreed, no delay, act or omission by either party in exercising any right or remedy will be deemed a waiver of that, or any other, right or remedy.',
          style: 'list'
        },
        {
          text: '16.4	Consent',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'Consent by a party, where required, will not prejudice its future right to withhold similar consent.',
          style: 'list'
        },
        {
          text: '16.5	Further assurance',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'Each party will do all further acts and execute all further documents necessary to give effect to this Agreement.',
          style: 'list'
        },
        {
          text: '16.6	Rights of third parties',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'This Agreement is not enforceable by any third party.',
          style: 'list'
        },
        {
          text: '16.7	Assignment and subcontracting',
          bold: true,
          style: 'block_2'
        },
        {
          text: '16.7.1	The Lender may assign any of its rights under this Agreement and the Security or transfer all its rights or obligations by novation to another company. The consent of the Borrower is required for an assignment or transfer by the Lender unless:',
          style: 'list'
        },
        {
          text: '(a)	the assignment or transfer is to a subsidiary of the Lender; or',
          style: 'list_2'
        },
        {
          text: '(b)	an Event of Default is continuing.Any such consent must not be unreasonably withheld or delayed and if not expressly refused within five Business Days shall be deemed given16.7.2	The Borrower may not assign any of it rights or transfer any rights or obligations under this Agreement or the Security..',
          style: 'list_2'
        },
        {
          text: '16.7.2	The Borrower may not assign any of it rights or transfer any rights or obligations under this Agreement or the Security.',
          style: 'list'
        },
        {
          text: '16.8	Entire agreement',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'This Agreement and documents referred to in it represent the entire agreement between the parties and supersede all previous agreements, term sheets and understandings relating to the Loan made available in this Agreement whether written or oral.',
          style: 'list'
        },
        {
          text: '16.9	Succession',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'This Agreement will bind and benefit each party’s successors and assigns.',
          style: 'list'
        },
        {
          text: '16.10	Counterparts',
          bold: true,
          style: 'block_2'
        },
        {
          text: 'This Agreement may be signed in any number of separate counterparts. Each, when executed and delivered by a party, will be an original; all counterparts will together constitute one instrument.',
          style: 'list'
        },
        {
          text: '17.	Notices',
          bold: true,
          style: 'block_2'
        },
        {
          text: '17.1	Notices under this Agreement will be in writing and sent to the person and address in this agreement. They may be given, and will be deemed received:',
          style: 'block_2'
        },
        {
          text: '17.1.1	by first-class post: four Business Days after posting;',
          style: 'list'
        },
        {
          text: '17.1.2	by hand: on delivery;',
          style: 'list'
        },
        {
          text: '17.1.3	by facsimile: on receipt of a successful transmission report from the correct number;',
          style: 'list'
        },
        {
          text: '17.1.4	by email: on receipt of a delivery read return mail from the correct address.',
          style: 'list'
        },
        {
          text: '18.	Confidential information',
          bold: true,
          style: 'block_2'
        },
        {
          text: '18.1	The Lender may disclose:',
          style: 'block_2'
        },
        {
          text: '18.1.1	on a confidential basis to a subsidiary and any actual or potential assignee, transferee or sub-participant of its rights or obligations under this agreement in addition to any publicly available information such information about the Borrower and the Guarantor as the Lender shall consider appropriate; and',
          style: 'list'
        },
        {
          text: '18.1.2	any information about the Borrower and the Guarantor to any person to the extent that it is required to do so by any applicable law, regulation or court order.',
          style: 'list'
        },
        {
          text: '18.2	Subject to clause 18.1, neither party will, without the other’s prior written consent, disclose:',
          style: 'block_2'
        },
        {
          text: '18.2.1	any information relating to the customers, suppliers, methods, products, plans, finances, trade secrets or otherwise to the business or affairs of the other party which is obviously confidential or has been identified by the other party as such]; and',
          style: 'list'
        },
        {
          text: '18.2.2	any information developed by either party in performing its obligations under, or otherwise pursuant to this Agreement,',
          styleS: 'list'
        },
        {
          text: '18.3	Neither party will use the other’s Confidential Information except to perform this Agreement.',
          style: 'block_2'
        },
        {
          text: '18.4	Disclosure of Confidential Information may be made to a party’s:',
          style: 'block_2'
        },
        {
          text: '18.4.1	officers;',
          style: 'list'
        },
        {
          text: '18.4.2	employees;',
          style: 'list'
        },
        {
          text: '18.4.3	professional advisers; and',
          style: 'list'
        },
        {
          text: '18.4.4	consultants and other agents, on condition that the party disclosing is responsible for compliance with the obligations of confidence hereunder.',
          style: 'list'
        },
        {
          text: '18.5	Confidential Information does not include information which:',
          style: 'block_2'
        },
        {
          text: '18.5.1	is or becomes public other than by breach of this Agreement;',
          style: 'list'
        },
        {
          text: '18.5.2	was known to the other party before this Agreement without breach of confidence;',
          style: 'list'
        },
        {
          text: '18.5.3	is independently developed by or becomes available to the other party without using any information supplied by the first party; or',
          style: 'list'
        },
        {
          text: '18.5.4	is required to be disclosed by law or regulatory authority.',
          style: 'list'
        },
        {
          text: '18.6	On termination of this Agreement all confidential and other information relating to or supplied by a party and which is or should be in the other\'s possession will be returned by the other or at the first party\'s option destroyed and certified by an officer of the party destroying as destroyed.',
          style: 'block_2'
        },
        {
          text: '19.	Governing law and jurisdiction',
          bold: true,
          style: 'block_2'
        },
        {
          text: '19.1	This Agreement is governed by the laws of Kenya.',
          style: 'block_2'
        },
        {
          text: '19.2	The parties will submit to the exclusive jurisdiction of the Kenyan courts.',
          style: 'block_2'
        },
        {
          text: 'Conditions Precedent',
          bold: true,
          fontSize: 15,
          alignment: 'center',
          margin: [0, 630, 0, 20]
        },
        {
          text: '1.	The duplicate of this Agreement duly executed by the Borrower.',
          style: 'block_2'
        },
        {
          text: '2.	Addendum(s) to this Short Form Facility Agreement to be duly executed by the Borrower.',
          style: 'block_2'
        },
        {
          text: '3.	Certified copies of the borrower’s identity documents.',
          style: 'block_2'
        },
        {
          text: 'IN WITNESS WHEREOF this Agreement has been duly executed by the parties the day and year first hereinbefore written:',
          style: 'block'
        },
        {
          text: 'SIGNED by the LENDER',
          style: 'block'
        },
        {
          style: 'block',
          columns: [
            [
              {
                text: `${this.lenderName}`
              },
              {
                text: 'In the presence of:'
              }
            ]
          ]
        },
        {
          text: '____________________________',
          style: 'block'
        },
        {
          text: '(LENDER SIGNATURE)',
          decoration: 'underline'
        },
        {
          text: 'ADVOCATE CERTIFICATE',
          style: 'ref_2'
        },
        {
          text: 'I, …………………………………………..ADVOCATE CERTIFY THAT I WAS PRESENT AND SAW	………………………………………….	SIGN THIS LOAN AGREEMENT AND THAT I EXPLAINED THE CONTENTS HEREIN AND HE UNDERSTOOD THEM',
          style: 'block'
        },
        {
          text: '_______________________',
          bold: true,
          style: 'block'
        },
        {
          text: 'ADVOCATE'
        },
        {
          text: 'SEALED with the COMMON SEAL of the BORROWER',
          style: 'block'
        },
        {
          text: `${this.borrowerCompanyName}`
        },
        {
          text: 'In the presence of:'
        },
        {
          text: '_____________________________',
          style: 'block'
        },
        {
          text: '(DIRECTOR)'
        },
        {
          text: '_____________________________',
          style: 'block'
        },
        {
          text: '(DIRECTOR/SECRETARY)'
        },
        {
          text: 'ADVOCATE CERTIFICATE',
          style: 'ref_2'
        },
        {
          text: 'I, …………………ADVOCATE CERTIFY THAT I WAS PRESENT AND SAW	……………………..	AND      ………………………………..  AS DIRECTORS /COMPANY SECRETARY OF THE LENDER HEREIN SIGN THIS LOAN AGREEMENT AND THAT I EXPLAINED THE CONTENTS HEREIN AND THEY UNDERSTOOD THEM.',
          style: 'block'
        },
        {
          text: '_______________________',
          style: 'block'
        },
        {
          text: 'ADVOCATE'
        }
      ],
      // PDF Metadata
      info: {
        title: 'LENDER LOAN MASTER AGREEMENT',
        author: 'EDGE THREE-SIXTY',
        subject: 'LENDER LOAN MASTER AGREEMENT',
        keywords: 'LENDER LOAN, LOAN APPLICATION, MASTER',
      },
      // Styling
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        block_2: {
          margin: [0, 0, 0, 10]
        },
        block_3: {
          margin: [0, 0, 0, 10],
          bold: true
        },
        ref: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 5],
          decoration: 'underline'
        },
        ref_2: {
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
          margin: [20, 10, 0, 10]
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
