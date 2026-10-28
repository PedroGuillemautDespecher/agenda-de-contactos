import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { soloPublicGuard } from './solo-public-guard';

describe('soloPublicGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => soloPublicGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
