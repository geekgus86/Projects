import { BloombergAuthRoutingModule } from '@app/bloomberg-auth/bloomberg-routing.module';

describe('BloombergAuthRoutingModule', () => {
  let bloombergAuthRoutingModule: BloombergAuthRoutingModule;

  beforeEach(() => {
    bloombergAuthRoutingModule = new BloombergAuthRoutingModule();
  });

  it('should create an instance', () => {
    expect(bloombergAuthRoutingModule).toBeTruthy();
  });
});
