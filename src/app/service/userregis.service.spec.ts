import { TestBed } from '@angular/core/testing';

import { UserregisService } from './userregis.service';

describe('UserregisService', () => {
  let service: UserregisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserregisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
