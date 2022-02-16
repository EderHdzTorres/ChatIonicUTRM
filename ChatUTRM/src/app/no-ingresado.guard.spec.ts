import { TestBed } from '@angular/core/testing';

import { NoIngresadoGuard } from './no-ingresado.guard';

describe('NoIngresadoGuard', () => {
  let guard: NoIngresadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoIngresadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
