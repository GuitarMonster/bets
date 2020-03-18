import { TestBed } from '@angular/core/testing';

import { LiveBetsService } from './live-bets.service';

describe('LiveBetsService', () => {
  let service: LiveBetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveBetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
