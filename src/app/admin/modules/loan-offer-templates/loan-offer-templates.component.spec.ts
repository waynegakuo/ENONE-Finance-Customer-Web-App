import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoanOfferTemplatesComponent } from './loan-offer-templates.component';

describe('LoanOfferTemplatesComponent', () => {
  let component: LoanOfferTemplatesComponent;
  let fixture: ComponentFixture<LoanOfferTemplatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanOfferTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanOfferTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
