import { TestBed } from '@angular/core/testing';

import { UserIdentityService } from './user-identity.service';

describe('UserIdentityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserIdentityService = TestBed.get(UserIdentityService);
    expect(service).toBeTruthy();
  });
});
