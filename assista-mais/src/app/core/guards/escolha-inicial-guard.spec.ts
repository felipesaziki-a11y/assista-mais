import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { escolhaInicialGuard } from './escolha-inicial-guard';

describe('escolhaInicialGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => escolhaInicialGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
