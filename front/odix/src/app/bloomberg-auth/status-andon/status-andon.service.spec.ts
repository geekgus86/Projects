import { TestBed, inject } from '@angular/core/testing';

import { StatusAndonService } from './status-andon.service';

describe('StatusAndonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusAndonService]
    });
  });

  it('should be created', inject([StatusAndonService], (service: StatusAndonService) => {
    expect(service).toBeTruthy();
  }));
});
