import { TestBed } from '@angular/core/testing';

import { FsServicesService } from './fs-services.service';

describe('FsServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FsServicesService = TestBed.get(FsServicesService);
    expect(service).toBeTruthy();
  });
});
