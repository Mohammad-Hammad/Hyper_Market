import { TestBed } from '@angular/core/testing';

import { AdmincrtService } from './admincrt.service';

describe('AdmincrtService', () => {
  let service: AdmincrtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmincrtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
