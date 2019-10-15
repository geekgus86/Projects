import { TestBed, inject } from '@angular/core/testing';

import { OcmServiceService } from './ocm-service.service';

describe('OcmServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OcmServiceService]
    });
  });

  it('should be created', inject([OcmServiceService], (service: OcmServiceService) => {
    expect(service).toBeTruthy();
  }));
});
