import { TestBed, inject } from '@angular/core/testing';

import { PowerbiService } from './powerbi.service';

describe('PowerbiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowerbiService]
    });
  });

  it('should be created', inject([PowerbiService], (service: PowerbiService) => {
    expect(service).toBeTruthy();
  }));
});
