import { TestBed, inject } from '@angular/core/testing';

import { MultipleFilterService } from '@app/shared/multiple-filter/multiple-filter.service';

describe('MultipleFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultipleFilterService]
    });
  });

  it('should be created', inject([MultipleFilterService], (service: MultipleFilterService) => {
    expect(service).toBeTruthy();
  }));
});
