import { BloombergRoutingModule } from '@app/bloomberg/bloomberg-routing.module';

describe('BloombergRoutingModule', () => {
  let bloombergRoutingModule: BloombergRoutingModule;

  beforeEach(() => {
    bloombergRoutingModule = new BloombergRoutingModule();
  });

  it('should create an instance', () => {
    expect(bloombergRoutingModule).toBeTruthy();
  });
});
