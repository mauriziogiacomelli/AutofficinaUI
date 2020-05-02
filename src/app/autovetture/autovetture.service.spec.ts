import { TestBed } from '@angular/core/testing';

import { AutovettureService } from './autovetture.service';

describe('AutovettureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutovettureService = TestBed.get(AutovettureService);
    expect(service).toBeTruthy();
  });
});
