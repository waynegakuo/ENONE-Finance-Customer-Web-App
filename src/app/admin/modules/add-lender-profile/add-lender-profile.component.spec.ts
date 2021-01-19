import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddLenderProfileComponent } from './add-lender-profile.component';

describe('AddLenderProfileComponent', () => {
  let component: AddLenderProfileComponent;
  let fixture: ComponentFixture<AddLenderProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLenderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLenderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
