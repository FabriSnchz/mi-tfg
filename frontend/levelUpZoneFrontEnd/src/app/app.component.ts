import { APP_ID, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouterOutlet, Router } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { AuthService } from './auth-service';

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
export class AppComponent implements OnInit {
  title = 'level-up-zone';
  isDarkTheme = false;
  isLoading = true;
  isLogged: boolean = false;
  role: string = '';

 // * Se inyecta el token DOCUMENT para acceder al DOM de forma segura, compatible con SSR y sin depender directamente de 'document'
  constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly router: Router, @Inject(PLATFORM_ID) private readonly platformId: Object, private readonly authService: AuthService) {
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

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.role = this.authService.getUserRole() ?? '';
      this.isLogged = this.authService.getToken() !== null;
    }

    // Si quieres redirigir automáticamente cuando ya hay sesión iniciada:
    if (this.isLogged) {
      this.router.navigate(['/']); // Ajusta la ruta según tus necesidades
    }
  }

  // * Alterna entre los temas claro y oscuro aplicando clases CSS al <body>.
  toggleThemeFromHeader(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('isDarkTheme', this.isDarkTheme.toString());

    const body = this.document.body;
    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
  }




  isLoggedIn(): boolean {
    const loggedIn = isPlatformBrowser(this.platformId) && !!localStorage.getItem('token');
    console.log('isLoggedIn called, result:', loggedIn);
    return loggedIn;
  }

}
