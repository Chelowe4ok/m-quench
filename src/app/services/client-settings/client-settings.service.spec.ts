import { TestBed } from '@angular/core/testing';

import { ClientSettingsService } from './client-settings.service';

describe('ClientSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientSettingsService = TestBed.get(ClientSettingsService);
    expect(service).toBeTruthy();
  });
});
