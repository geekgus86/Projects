import { EditingReportsModule } from '@app/bloomberg-auth/bloomberg-auth.module';

describe('EditingReportsModule', () => {
  let editingReportsModule: EditingReportsModule;

  beforeEach(() => {
    editingReportsModule = new EditingReportsModule();
  });

  it('should create an instance', () => {
    expect(editingReportsModule).toBeTruthy();
  });
});
