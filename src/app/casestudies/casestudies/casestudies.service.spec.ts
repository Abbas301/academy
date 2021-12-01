import { TestBed } from '@angular/core/testing';

import { CasestudiesService } from './casestudies.service';

describe('CasestudiesService', () => {
  let service: CasestudiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasestudiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
