import { TestBed, inject } from '@angular/core/testing';

import { OperatorViewService } from './operator-view.service';

describe('OperatorViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperatorViewService]
    });
  });

  it('should be created', inject([OperatorViewService], (service: OperatorViewService) => {
    expect(service).toBeTruthy();
  }));
});
