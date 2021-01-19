import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LenderprofilesComponent } from './lenderprofiles.component';

describe('LenderprofilesComponent', () => {
  let component: LenderprofilesComponent;
  let fixture: ComponentFixture<LenderprofilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderprofilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
