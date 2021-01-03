import { TestBed } from '@angular/core/testing';

import { FsServicesService } from './fs-services.service';
import { HttpClientModule } from '@angular/common/http';

describe('FsServicesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [FsServicesService],
    })
  );

  it('should be created', () => {
    const service: FsServicesService = TestBed.inject(FsServicesService);
    expect(service).toBeTruthy();
  });
});
