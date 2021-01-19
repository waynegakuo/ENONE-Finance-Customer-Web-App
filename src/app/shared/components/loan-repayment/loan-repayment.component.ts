import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PaymentsService } from '../../services/payments/payments.service';

@Component({
  selector: 'app-loan-repayment',
  templateUrl: './loan-repayment.component.html',
  styleUrls: ['./loan-repayment.component.scss']
})
export class LoanRepaymentComponent implements OnInit {

  @Input() loan;
  subs: Subscription;
  isPartial: boolean;
  isFull: boolean;
  showInstructionPartial: boolean;
  partialAmountValue;

  constructor(private fb: FormBuilder, public repayLoan: PaymentsService) {
    // Subscribing to the value of the form control (radio-button) using the amountPay getter method
    this.subs = this.amountPay.valueChanges
      .subscribe(checkedValue => {
        if (checkedValue === 'Partial') {
          this.isPartial = true;
          this.isFull = false;
          this.showInstructionPartial = false;
        } else {
          this.isPartial = false;
          this.isFull = true;
          this.showInstructionPartial = false;
        }
      });
   }

  repayChoice = this.fb.group({
    amountPay: ['', Validators.required],
    partialAmount: ['']
  });

  // Getting radio button values
  get amountPay(): AbstractControl {
    const items = this.repayChoice.get('amountPay');
    return items;
  }

  // tslint:disable-next-line: typedef
  showInstructions(){
    this.partialAmountPay();
    this.showInstructionPartial = !this.showInstructionPartial;
  }

   // Getting the partial amount value from the form
  // tslint:disable-next-line: typedef
  partialAmountPay(){
    this.partialAmountValue = this.repayChoice.controls.partialAmount.value;
    return this.partialAmountValue;
  }

  ngOnInit(): void {
  }

  /**
   * Invoke the addRepayment method to put repayment details to Firebase
   */
  // tslint:disable-next-line: typedef
  addLoanRepayment(){
    this.repayLoan.addRepayment();
  }

}
