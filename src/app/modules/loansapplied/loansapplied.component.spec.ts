import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoansappliedComponent } from './loansapplied.component';

describe('LoansappliedComponent', () => {
  let component: LoansappliedComponent;
  let fixture: ComponentFixture<LoansappliedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoansappliedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansappliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
