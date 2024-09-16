import { TestBed } from '@angular/core/testing';

import { StartAnimationService } from './start-animation.service';

describe('StartAnimationService', () => {
  let service: StartAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
