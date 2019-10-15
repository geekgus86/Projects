import { OdixModule } from './odix.module';

describe('OdixModule', () => {
  let odixModule: OdixModule;

  beforeEach(() => {
    odixModule = new OdixModule();
  });

  it('should create an instance', () => {
    expect(odixModule).toBeTruthy();
  });
});
