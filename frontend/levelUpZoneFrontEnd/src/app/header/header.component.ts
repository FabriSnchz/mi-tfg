import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, MatSlideToggleModule, MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  badgeCount!: number;
  isLoading = true;
  isLogged: boolean = false;
  role: string = '';
  userName: string = '';
  readonly dialog = inject(MatDialog);
  @Output() themeToggled = new EventEmitter<void>();

  constructor(private readonly authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private readonly platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.role = this.authService.getUserRole() ?? '';
      this.isLogged = this.authService.getToken() !== null;
      this.userName = this.authService.getUserName() ?? ''; // <- nuevo
    }
  }

  toggleTheme(): void {
    this.themeToggled.emit(); // sólo emite el evento
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(Dialog, {
      width: '90%',
      // height: '75%',
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
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  isRegisterMode = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;  // { userName: ..., password: ... }

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token, response.role, response.userName, response.id); // Guarda el token como jwt
          console.log('Saving userId:', response.id);  // Verifica que el userId se guarda correctamente

          this.router.navigate(['/']);
          // window.location.href = '/' // Úsalo solo si necesitas recargar completamente
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
      console.log('Formulario de registro válido:', this.registerForm.value);

      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('Respuesta del backend al registrarse:', res);
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
  }

  readonly dialogRef = inject(MatDialogRef<Dialog>);
}
