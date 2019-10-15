import { TestBed, inject } from '@angular/core/testing';

import { WorldWidePlantsService } from '@app/bloomberg/worldmap/world-wide-plants.service';

describe('WorldWidePlantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorldWidePlantsService]
    });
  });

  it('should be created', inject([WorldWidePlantsService], (service: WorldWidePlantsService) => {
    expect(service).toBeTruthy();
  }));
});
