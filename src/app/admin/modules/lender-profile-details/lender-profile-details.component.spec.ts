import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LenderProfileDetailsComponent } from './lender-profile-details.component';

describe('LenderProfileDetailsComponent', () => {
  let component: LenderProfileDetailsComponent;
  let fixture: ComponentFixture<LenderProfileDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
