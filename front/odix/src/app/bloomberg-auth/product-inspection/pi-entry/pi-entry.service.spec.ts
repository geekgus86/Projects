import { TestBed, inject } from '@angular/core/testing';

import { PiEntryService } from './pi-entry.service';

describe('PiEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiEntryService]
    });
  });

  it('should be created', inject([PiEntryService], (service: PiEntryService) => {
    expect(service).toBeTruthy();
  }));
});
