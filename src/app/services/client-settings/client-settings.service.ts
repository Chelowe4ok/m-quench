import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Screen } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class ClientSettingsService {
  screen = new BehaviorSubject<Screen>('desktop');

  constructor() { }
}
