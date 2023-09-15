import { TestBed } from '@angular/core/testing';

import { CommonChecksService } from './common-checks.service';

describe('CommonChecksService', () => {
  let service: CommonChecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonChecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
