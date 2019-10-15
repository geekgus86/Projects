import { TestBed, inject } from '@angular/core/testing';

import { GlobalService } from '@app/bloomberg/global/global.service';

describe('GlobalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalService]
    });
  });

  it('should be created', inject([GlobalService], (service: GlobalService) => {
    expect(service).toBeTruthy();
  }));
});
