import { TestBed } from '@angular/core/testing';

import { JuiceService } from './juice.service';

describe('JuiceService', () => {
  let service: JuiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
