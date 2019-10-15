import { TestBed, inject } from '@angular/core/testing';

import { FormingService } from './forming.service';

describe('FormingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormingService]
    });
  });

  it('should be created', inject([FormingService], (service: FormingService) => {
    expect(service).toBeTruthy();
  }));
});
