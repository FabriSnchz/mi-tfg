import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, MatSlideToggleModule, MatButtonModule, MatMenuModule],
    // RouterLinkActive es una directiva que agrega una clase CSS cuando el enlace está activo
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() themeToggled = new EventEmitter<void>();

  toggleTheme(): void {
    this.themeToggled.emit(); // sólo emite el evento
  }
}
