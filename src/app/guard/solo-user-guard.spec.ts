import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { soloUserGuard } from './solo-user-guard';

describe('soloUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => soloUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
