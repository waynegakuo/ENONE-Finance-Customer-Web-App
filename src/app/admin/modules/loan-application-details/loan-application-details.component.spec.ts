import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoanApplicationDetailsComponent } from './loan-application-details.component';

describe('LoanApplicationDetailsComponent', () => {
  let component: LoanApplicationDetailsComponent;
  let fixture: ComponentFixture<LoanApplicationDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanApplicationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
