import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit {

  monthlyPayment;
  totalInterest;
  totalPayment;

  loanCalculatorForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loanCalculatorForm = this.fb.group({
      loanAmount: [''],
      loanInterest: [''],
      years: ['']
    });
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    const amount = this.loanCalculatorForm.controls.loanAmount.value;
    const interest = this.loanCalculatorForm.controls.loanInterest.value;
    const yrs = this.loanCalculatorForm.controls.years.value;

    // Calculate
    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(interest) / 100 / 12;
    const calculatedPayments = parseFloat(yrs) * 12;

    // Calculating the monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    const monthlyPayment = monthly.toFixed(2);

    // Calculating the total interest
    const totalInterest = (monthly * calculatedPayments - principal).toFixed(2);

    // Calculating the total payment
    const totalPayment = (monthly * calculatedPayments).toFixed(2);

    // Rendering values to DOM
    this.monthlyPayment = monthlyPayment;
    this.totalInterest = totalInterest;
    this.totalPayment = totalPayment;

    // console.log(pickLoanAmount);
  }

}
