import { TestBed } from '@angular/core/testing';

import { DemandeService } from './demande.service';

describe('CreditService', () => {
  let service: DemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
