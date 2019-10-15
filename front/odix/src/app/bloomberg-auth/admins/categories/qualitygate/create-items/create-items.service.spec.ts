import { TestBed, inject } from '@angular/core/testing';

import { CreateItemsService } from './create-items.service';

describe('CreateItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateItemsService]
    });
  });

  it('should be created', inject([CreateItemsService], (service: CreateItemsService) => {
    expect(service).toBeTruthy();
  }));
});
