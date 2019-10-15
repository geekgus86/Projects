import { ReportsRoutingModule } from '@app/reports/reports-routing.module';

describe('ReportsRoutingModule', () => {
  let reportsRoutingModule: ReportsRoutingModule;

  beforeEach(() => {
    reportsRoutingModule = new ReportsRoutingModule();
  });

  it('should create an instance', () => {
    expect(reportsRoutingModule).toBeTruthy();
  });
});
