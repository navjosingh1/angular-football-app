import { TestBed } from '@angular/core/testing';

import { AddHeaderInterceptorInterceptor } from './add-header-interceptor.interceptor';

describe('AddHeaderInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddHeaderInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddHeaderInterceptorInterceptor = TestBed.inject(AddHeaderInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
