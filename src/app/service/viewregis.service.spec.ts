import { TestBed } from '@angular/core/testing';

import { ViewregisService } from './viewregis.service';

describe('ViewregisService', () => {
  let service: ViewregisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewregisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
