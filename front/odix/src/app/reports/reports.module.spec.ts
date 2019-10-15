import { ReportsModule } from '@app/reports/reports.module';

describe('ReportsModule', () => {
  let reportsModule: ReportsModule;

  beforeEach(() => {
    reportsModule = new ReportsModule();
  });

  it('should create an instance', () => {
    expect(reportsModule).toBeTruthy();
  });
});
