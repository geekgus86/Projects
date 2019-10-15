import { TestBed, inject } from '@angular/core/testing';

import { DashboardService } from '@app/bloomberg/dashboard/dashboard.service';

describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService]
    });
  });

  it('should be created', inject([DashboardService], (service: DashboardService) => {
    expect(service).toBeTruthy();
  }));
});
