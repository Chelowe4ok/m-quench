import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const APP_PREFIX = 'VISA-';

export const AUTH_KEY = 'AUTH';

declare var window: any;

@Injectable()
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platform: any) {}

  static loadInitialState() {

    if (typeof window !== 'undefined') {

      return Object.keys(localStorage).reduce((state: any, storageKey) => {
        if (storageKey.includes(APP_PREFIX)) {
          const stateKeys = storageKey
            .replace(APP_PREFIX, '')
            .toLowerCase()
            .split('.')
            .map(key =>
              key
                .split('-')
                .map(
                  (token, index) =>
                    index === 0
                      ? token
                      : token.charAt(0).toUpperCase() + token.slice(1)
                )
                .join('')
            );
          let currentStateRef = state;
          stateKeys.forEach((key, index) => {
            if (index === stateKeys.length - 1) {
              currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
              return;
            }
            currentStateRef[key] = currentStateRef[key] || {};
            currentStateRef = currentStateRef[key];
          });
        }
        return state;
      }, {});
    }    
  }

  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platform)) {
      localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    if (isPlatformBrowser(this.platform)) {
       return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
    }
  }

  removeItem(key: string) {
    if (isPlatformBrowser(this.platform)) {
       localStorage.removeItem(`${APP_PREFIX}${key}`);
    }
  }
}
