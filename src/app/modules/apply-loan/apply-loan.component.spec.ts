import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApplyLoanComponent } from './apply-loan.component';

describe('ApplyLoanComponent', () => {
  let component: ApplyLoanComponent;
  let fixture: ComponentFixture<ApplyLoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
