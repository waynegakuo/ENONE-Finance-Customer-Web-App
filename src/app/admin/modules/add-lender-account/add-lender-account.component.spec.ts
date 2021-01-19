import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddLenderAccountComponent } from './add-lender-account.component';

describe('AddLenderAccountComponent', () => {
  let component: AddLenderAccountComponent;
  let fixture: ComponentFixture<AddLenderAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLenderAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLenderAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
