import { TestBed, inject } from '@angular/core/testing';

import { TrainOperatorService } from './train-operator.service';

describe('TrainOperatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainOperatorService]
    });
  });

  it('should be created', inject([TrainOperatorService], (service: TrainOperatorService) => {
    expect(service).toBeTruthy();
  }));
});
