import { TestBed, inject } from '@angular/core/testing';

import { KpiService } from '@app/bloomberg/kpi-dashboard/kpi-dashboard.service';

describe('KpiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KpiService]
    });
  });

  it('should be created', inject([KpiService], (service: KpiService) => {
    expect(service).toBeTruthy();
  }));
});
