import {
  Component,
  Inject,
  HostListener,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { Screen } from '@app/models';

import { THEME, MOBILE_SCREEN, TABLET_SCREEN } from '@app/theme';
import { ClientSettingsService } from '@app/services';

@Component({
  selector: 'mq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private cSettings: ClientSettingsService
  ) { }

  ngOnInit(): void {
    this.setTheme();

    this.initScreenListener();
    this.setScreen(this.defineDeviceScreen());
  }

  private setTheme(): void {
    this.renderer.addClass(this.document.body, THEME);
  }

  private initScreenListener(): void {
    this.mobileQuery = this.media.matchMedia(`(max-width: ${MOBILE_SCREEN}px)`);
    this.tabletQuery = this.media.matchMedia(`(max-width: ${TABLET_SCREEN}px)`);
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private defineDeviceScreen(): Screen {
    if (this.mobileQuery.matches) {
      return 'mobile';
    } else if (this.tabletQuery.matches) {
      return 'tablet';
    }

    return 'desktop';
  }

  private setScreen(screen: Screen): void {

    // if current screen equal new screen
    if (this.document.body.classList.contains(screen)) return;

    // clear screen size if exist
    if (this.document.body.classList.contains('mobile')) {
      this.renderer.removeClass(this.document.body, 'mobile');
    } else if (this.document.body.classList.contains('tablet')) {
      this.renderer.removeClass(this.document.body, 'tablet');
    } else if (this.document.body.classList.contains('desktop')) {
      this.renderer.removeClass(this.document.body, 'desktop');
    }

    this.renderer.addClass(this.document.body, screen);
    this.cSettings.screen.next(screen);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, THEME);
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.setScreen(this.defineDeviceScreen());
  }
}
