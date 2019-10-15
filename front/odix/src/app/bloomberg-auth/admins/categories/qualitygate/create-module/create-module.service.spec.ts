import { TestBed, inject } from '@angular/core/testing';

import { CreateModuleService } from './create-module.service';

describe('CreateModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateModuleService]
    });
  });

  it('should be created', inject([CreateModuleService], (service: CreateModuleService) => {
    expect(service).toBeTruthy();
  }));
});
