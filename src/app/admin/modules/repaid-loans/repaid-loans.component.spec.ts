import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaidLoansComponent } from './repaid-loans.component';

describe('RepaidLoansComponent', () => {
  let component: RepaidLoansComponent;
  let fixture: ComponentFixture<RepaidLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepaidLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaidLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
