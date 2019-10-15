import { TestBed, inject } from '@angular/core/testing';

import { CreateOperatorService } from './create-operator.service';

describe('CreateOperatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateOperatorService]
    });
  });

  it('should be created', inject([CreateOperatorService], (service: CreateOperatorService) => {
    expect(service).toBeTruthy();
  }));
});
