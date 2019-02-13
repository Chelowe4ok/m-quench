import { NgModule, Injectable, Injector, Inject, InjectionToken, PLATFORM_ID, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '@env/environment';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { httpInterceptorProviders } from './http-interceptors';
import { LocalStorageService } from './local-storage/local-storage.service';

import { AnimationsService } from './animations/animations.service';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { NotificationService } from './notifications/notification.service';

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  declarations: [],
  providers: [
    NotificationService,
    LocalStorageService,

    AnimationsService,
    httpInterceptorProviders,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  exports: [TranslateModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    @Inject(PLATFORM_ID) private platform: any,
    private translate: TranslateService
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }

    if (isPlatformBrowser(this.platform)) {

      translate.setDefaultLang('en');

      if (environment.production) {
      }
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `/assets/i18n/`,
    '.json'
  );
}
