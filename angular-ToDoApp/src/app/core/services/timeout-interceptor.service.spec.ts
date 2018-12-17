import { TestBed } from '@angular/core/testing';

import { TimeoutInterceptor } from './timeout-interceptor.service';

describe('TimeoutInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeoutInterceptor = TestBed.get(TimeoutInterceptor);
    expect(service).toBeTruthy();
  });
});
