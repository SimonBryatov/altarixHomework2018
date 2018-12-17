import { TestBed } from '@angular/core/testing';

import { ContentTypeInterceptorService } from './content-type-interceptor.service';

describe('ContentTypeInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentTypeInterceptorService = TestBed.get(ContentTypeInterceptorService);
    expect(service).toBeTruthy();
  });
});
