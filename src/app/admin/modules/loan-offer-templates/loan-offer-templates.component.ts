import { PersonalGuaranteeService } from './../../services/loan-offer-templates/personal-guarantee/personal-guarantee.service';
import { LetterOfOfferService } from './../../services/loan-offer-templates/letter-of-offer/letter-of-offer.service';
import { LenderLoanMasterService } from './../../services/loan-offer-templates/lender-loan-master/lender-loan-master.service';
import { LenderAddendumToMasterService } from './../../services/loan-offer-templates/lender-addendum-to-master/lender-addendum-to-master.service';
import { FinalDemandService } from './../../services/loan-offer-templates/final-demand/final-demand.service';
import { BoardResolutionService } from './../../services/loan-offer-templates/board-resolution/board-resolution.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-loan-offer-templates',
  templateUrl: './loan-offer-templates.component.html',
  styleUrls: ['./loan-offer-templates.component.scss']
})
export class LoanOfferTemplatesComponent implements OnInit, OnDestroy {
  loanTempSelect;

  subs: Subscription;
  boardResolution: boolean;
  finalDemand: boolean;
  lenderAddendum: boolean;
  lenderLoan: boolean;
  letterOffer: boolean;
  personalGuarantee: boolean;

  constructor(private fb: FormBuilder, public boardRes: BoardResolutionService, public finalDem: FinalDemandService,
              public lenderAddend: LenderAddendumToMasterService, public lenderLoanMaster: LenderLoanMasterService,
              public letterOfOffer: LetterOfOfferService, public personalGuarant: PersonalGuaranteeService) { }

  // Getting value from the Reactive Form for selecting loan template
  get loanDocumentTemplate(): AbstractControl {
    const selectedTemp = this.loanTempSelect.get('template');
    return selectedTemp;
  }

  ngOnInit(): void {
    this.loanTempSelect = this.fb.group({
      template: ['', Validators.required]
    });

    // Subscribing to the value of the form control using the loanDocumentTemplate getter method
    this.subs = this.loanDocumentTemplate.valueChanges
      .subscribe(selectedValue => {
        if (selectedValue === 'Board Resolution') {
          this.boardResolution = true;
          this.finalDemand = false;
          this.lenderAddendum = false;
          this.lenderLoan = false;
          this.letterOffer = false;
          this.personalGuarantee = false;

        }
        else if (selectedValue === 'Final Demand') {
          this.boardResolution = false;
          this.finalDemand = true;
          this.lenderAddendum = false;
          this.lenderLoan = false;
          this.letterOffer = false;
          this.personalGuarantee = false;
        }
        else if (selectedValue === 'Lender Addednum') {
          this.boardResolution = false;
          this.finalDemand = false;
          this.lenderAddendum = true;
          this.lenderLoan = false;
          this.letterOffer = false;
          this.personalGuarantee = false;
        }
        else if (selectedValue === 'Lender Loan') {
          this.boardResolution = false;
          this.finalDemand = false;
          this.lenderAddendum = false;
          this.lenderLoan = true;
          this.letterOffer = false;
          this.personalGuarantee = false;
        }
        else if (selectedValue === 'Letter of Offer') {
          this.boardResolution = false;
          this.finalDemand = false;
          this.lenderAddendum = false;
          this.lenderLoan = false;
          this.letterOffer = true;
          this.personalGuarantee = false;
        }
        else if (selectedValue === 'Personal Guarantee') {
          this.boardResolution = false;
          this.finalDemand = false;
          this.lenderAddendum = false;
          this.lenderLoan = false;
          this.letterOffer = false;
          this.personalGuarantee = true;
        }
      });
  }

  boardResolutionLetter(): void {
    this.boardRes.generatePdf();
  }

  finalDemandLetter(): void {
    this.finalDem.generatePdf();
  }

  lenderAddendumLetter(): void {
    this.lenderAddend.generatePdf();
  }

  lenderLoanMasterLetter(): void {
    this.lenderLoanMaster.generatePdf();
  }

  personalGuaranteeLetter(): void {
    this.personalGuarant.generatePdf();
  }

  letterOfOfferLetter(): void {
    this.letterOfOffer.generatePdf();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
