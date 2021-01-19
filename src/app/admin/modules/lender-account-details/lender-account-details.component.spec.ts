import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LenderAccountDetailsComponent } from './lender-account-details.component';

describe('LenderAccountDetailsComponent', () => {
  let component: LenderAccountDetailsComponent;
  let fixture: ComponentFixture<LenderAccountDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderAccountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
