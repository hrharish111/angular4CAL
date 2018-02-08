import { TestBed, inject } from '@angular/core/testing';

import { FirstserviceService } from './firstservice.service';

describe('FirstserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstserviceService]
    });
  });

  it('should be created', inject([FirstserviceService], (service: FirstserviceService) => {
    expect(service).toBeTruthy();
  }));
});
