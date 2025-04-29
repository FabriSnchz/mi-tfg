import { APP_ID, Component, Inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouterOutlet, Router } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, LoadingComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
      { provide: APP_ID, useValue: 'level-up-zone' },
    ]
})
export class AppComponent {
  title = 'level-up-zone';
  isDarkTheme = false;
  isLoading = true;

 // * Se inyecta el token DOCUMENT para acceder al DOM de forma segura, compatible con SSR y sin depender directamente de 'document'
  constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.isLoading = false;
        }, 500); // 1 segundo
      }
    });
  }

  // * Alterna entre los temas claro y oscuro aplicando clases CSS al <body>.
  toggleThemeFromHeader(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const body = this.document.body;

    if (this.isDarkTheme) {
      body.classList.add('dark-mode');
      body.classList.remove('light-theme');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-theme');
    }
  }
}
