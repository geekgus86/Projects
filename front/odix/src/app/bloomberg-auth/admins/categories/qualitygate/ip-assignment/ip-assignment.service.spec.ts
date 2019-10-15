import { TestBed, inject } from '@angular/core/testing';

import { IpAssignmentService } from './ip-assignment.service';

describe('IpAssignmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpAssignmentService]
    });
  });

  it('should be created', inject([IpAssignmentService], (service: IpAssignmentService) => {
    expect(service).toBeTruthy();
  }));
});
