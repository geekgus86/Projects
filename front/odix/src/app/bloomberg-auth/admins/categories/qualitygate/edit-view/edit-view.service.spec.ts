import { TestBed, inject } from '@angular/core/testing';

import { EditViewService } from './edit-view.service';

describe('EditViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditViewService]
    });
  });

  it('should be created', inject([EditViewService], (service: EditViewService) => {
    expect(service).toBeTruthy();
  }));
});
