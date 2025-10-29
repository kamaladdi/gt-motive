import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

/** Main shell with toolbar and navigation */
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class ShellComponent {
  private readonly router = inject(Router);

  protected readonly showBackButton = signal(false);
  protected readonly pageTitle = signal<string | null>(null);

  constructor() {
    const navigationEnd$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );

    toSignal(navigationEnd$, { requireSync: false });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateToolbarState();
      });

    this.updateToolbarState();
  }

  private updateToolbarState(): void {
    const url = this.router.url;

    if (url === '/' || url === '/brands') {
      this.showBackButton.set(false);
      this.pageTitle.set('Vehicle Manufacturers');
    } else if (url.startsWith('/brand/')) {
      this.showBackButton.set(true);
      const brandName = this.extractBrandNameFromUrl(url);
      this.pageTitle.set(brandName || 'Brand Details');
    } else {
      this.showBackButton.set(true);
      this.pageTitle.set(null);
    }
  }

  private extractBrandNameFromUrl(url: string): string | null {
    const match = url.match(/\/brand\/([^/?]+)/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]).replace(/\+/g, ' ');
    }
    return null;
  }

  protected onBackClick(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/brands']);
    }
  }
}
