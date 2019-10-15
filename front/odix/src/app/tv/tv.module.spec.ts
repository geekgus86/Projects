import { TvModule } from './tv.module';

describe('TvModule', () => {
  let tvModule: TvModule;

  beforeEach(() => {
    tvModule = new TvModule();
  });

  it('should create an instance', () => {
    expect(tvModule).toBeTruthy();
  });
});
