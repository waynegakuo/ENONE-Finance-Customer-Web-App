import { TestBed } from '@angular/core/testing';

import { MailSmsService } from './mail-sms.service';

describe('MailSmsService', () => {
  let service: MailSmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailSmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
