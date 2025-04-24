import { TestBed } from '@angular/core/testing';

import { TodaysOrderService } from './todays-order.service';

describe('TodaysOrderService', () => {
  let service: TodaysOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodaysOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
