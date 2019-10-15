import { TestBed, inject } from '@angular/core/testing';

import { ViewsListService } from './views-list.service';

describe('ViewsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewsListService]
    });
  });

  it('should be created', inject([ViewsListService], (service: ViewsListService) => {
    expect(service).toBeTruthy();
  }));
});
