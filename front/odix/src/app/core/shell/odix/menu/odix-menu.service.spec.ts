import { TestBed, inject } from '@angular/core/testing';

import { OdixMenuService } from '@app/core/shell/odix/menu/odix-menu.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdixMenuService]
    });
  });

  it('should be created', inject([OdixMenuService], (service: OdixMenuService) => {
    expect(service).toBeTruthy();
  }));
});
