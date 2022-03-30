import { TestBed } from '@angular/core/testing';

import { AdminpofileService } from './adminpofile.service';

describe('AdminpofileService', () => {
  let service: AdminpofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminpofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
