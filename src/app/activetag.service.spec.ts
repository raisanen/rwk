import { TestBed, inject } from '@angular/core/testing';

import { ActivetagService } from './activetag.service';

describe('ActivetagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivetagService]
    });
  });

  it('should be created', inject([ActivetagService], (service: ActivetagService) => {
    expect(service).toBeTruthy();
  }));
});
