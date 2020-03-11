import { TestBed } from '@angular/core/testing';

import { LeavemanagementService } from './leavemanagement.service';

describe('LeavemanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeavemanagementService = TestBed.get(LeavemanagementService);
    expect(service).toBeTruthy();
  });
});
