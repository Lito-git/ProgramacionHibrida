import { TestBed } from '@angular/core/testing';

import { AdminitracionService } from './administracion.service';

describe('AdminitracionService', () => {
  let service: AdminitracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminitracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
