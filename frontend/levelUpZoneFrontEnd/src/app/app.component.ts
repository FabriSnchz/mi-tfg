import { APP_ID, Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
      { provide: APP_ID, useValue: 'level-up-zone' },
    ]
})
export class AppComponent {
  isDarkTheme = false; // Puedes controlar esto con un botón de toggle
  title = 'level-up-zone';

  toggleThemeFromHeader(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-theme');
    }
  }
}
