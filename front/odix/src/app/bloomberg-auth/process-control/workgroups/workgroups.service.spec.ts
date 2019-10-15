import { TestBed, inject } from '@angular/core/testing';

import { WorkgroupsService } from './workgroups.service';

describe('WorkgroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkgroupsService]
    });
  });

  it('should be created', inject([WorkgroupsService], (service: WorkgroupsService) => {
    expect(service).toBeTruthy();
  }));
});
