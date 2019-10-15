import { BloombergModule } from '@app/bloomberg/bloomberg.module';

describe('BloombergModule', () => {
  let bloombergModule: BloombergModule;

  beforeEach(() => {
    bloombergModule = new BloombergModule();
  });

  it('should create an instance', () => {
    expect(bloombergModule).toBeTruthy();
  });
});
