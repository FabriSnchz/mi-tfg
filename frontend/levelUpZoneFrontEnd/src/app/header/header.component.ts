import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, inject, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import { GamesService } from '../games.service';

import { CommonModule, DOCUMENT } from '@angular/common';
import { effect, signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, MatSlideToggleModule, MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    animations: [
    trigger('iconFade', [
      state('light', style({ opacity: 1, transform: 'scale(1)' })),
      state('dark', style({ opacity: 1, transform: 'scale(1)' })),
      transition('light <=> dark', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' })),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1.2)' })),
        animate('100ms ease-in', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  imageList: string[] = [
    '/images/logos/logo_pixel_art_loved.png',
    '/images/logos/logo_pixel_art_happy.png',
    '/images/logos/logo_pixel_art_died.png',
    '/images/logos/logo_pixel_art.png'
  ];

  // Imagen actual
  currentImage: string = '/images/logos/logo_pixel_art.png';

  // Método para cambiar la imagen a una aleatoria
  changeImage(): void {
    const randomIndex = Math.floor(Math.random() * this.imageList.length);
    this.currentImage = this.imageList[randomIndex];
  }
  badgeCount!: number;
  isLoading = true;
  isLogged: boolean = false;
  role: string = '';
  userName: string = '';
  profileImage: string = '';
  readonly dialog = inject(MatDialog);
  // @Output() themeToggled = new EventEmitter<void>();

    // * Para el modo oscuro/claro
  isDarkMode = signal(false);
  private readonly _document = inject(DOCUMENT);


  constructor(private readonly authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private readonly platformId: Object, private readonly gamesService: GamesService) {
    effect(() => {
      const isDark = this.isDarkMode();
      this._document.body.classList.toggle('dark-mode', isDark);

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
      }
    });
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    // 🌓 Leer el modo oscuro desde localStorage
    const savedMode = localStorage.getItem('dark-mode');
    this.isDarkMode.set(savedMode === 'enabled');

    // 🔐 Autenticación
    this.role = this.authService.getUserRole() ?? '';
    this.isLogged = this.authService.getToken() !== null;
    this.userName = this.authService.getUserName() ?? '';

    this.profileImage = localStorage.getItem('profileImage') || '/images/avatars/avatar1.png'; // Imagen por defecto si no hay

    // 🎮 Juegos temporales
    const storedGames = localStorage.getItem('temporaryGames');
    const games: any[] = storedGames ? JSON.parse(storedGames) : [];

    if (storedGames) {
      const userId = localStorage.getItem('userId');
      const infoGames = JSON.parse(storedGames) as { userId: string; gameId: number }[];
      const gameIds = infoGames.filter(g => g.userId === userId).map(g => g.gameId);
      const initialCount = gameIds.length;
      this.gamesService.setBadgeCount(initialCount);
    }
  }

  // 🔄 Suscripción al contador del badge
  this.gamesService.badgeCount$.subscribe(count => {
    this.badgeCount = count;
  });

  }
  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
    localStorage.setItem('darkMode', this.isDarkMode().toString());
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(Dialog, {
      width: '90%',
      height: '75%',
      enterAnimationDuration,
      exitAnimationDuration,
      backdropClass: 'blur-backdrop'
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirige a página pública como inicio o login
  }

  }
@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
  styleUrl: 'header.component.scss',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  isRegisterMode = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  avatarList: string[] = [
  '/images/avatars/avatar1.png',
  '/images/avatars/avatar2.png',
  '/images/avatars/avatar3.png',
  '/images/avatars/avatar4.png',
  '/images/avatars/avatar5.png'
  ];

  selectedAvatar: string = '';
  showAvatarPopup: boolean = false;

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
    this.showAvatarPopup = false;
    this.registerForm.get('profileImage')?.setValue(avatar);
  }

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private router: Router, private cdr: ChangeDetectorRef ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
      profileImage: ['', Validators.required],

    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;  // { userName: ..., password: ... }

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token, response.role, response.userName, response.userId, response.profileImage); // Guarda el token como jwt
          // this.router.navigate(['/']);
          window.location.href = '/'; // Úsalo solo si necesitas recargar completamente
        },
        error: (err) => {
          alert('Credenciales incorrectas');
        }
      });
    } else {
      console.warn('Formulario inválido:', this.loginForm.errors);
    }
  }


  onRegister(): void {
    if (this.registerForm.valid) {

      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.toggleRegister(false);
          },
        error: (err) => {
          console.error('Error al registrarse:', err);
          alert('Error al registrarse');
        }
      });
    } else {
      console.warn('Formulario de registro inválido');

      // Imprimir errores específicos de cada campo
      Object.entries(this.registerForm.controls).forEach(([key, control]) => {
        console.log(`Campo ${key}:`, control.errors);
      });
      return;
    }
  }
  toggleRegister(showRegister: boolean): void {
    this.isRegisterMode = showRegister;
    this.cdr.markForCheck();
  }

  readonly dialogRef = inject(MatDialogRef<Dialog>);
}
