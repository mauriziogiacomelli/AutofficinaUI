import { TestBed } from '@angular/core/testing';

import { LavoriService } from './lavori.service';

describe('LavoroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LavoriService = TestBed.get(LavoriService);
    expect(service).toBeTruthy();
  });
});
