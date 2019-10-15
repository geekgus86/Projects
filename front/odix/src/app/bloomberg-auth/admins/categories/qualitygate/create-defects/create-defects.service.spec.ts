import { TestBed, inject } from '@angular/core/testing';

import { CreateDefectsService } from './create-defects.service';

describe('CreateDefectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateDefectsService]
    });
  });

  it('should be created', inject([CreateDefectsService], (service: CreateDefectsService) => {
    expect(service).toBeTruthy();
  }));
});
