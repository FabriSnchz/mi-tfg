import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, inject, Inject } from '@angular/core';
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


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, MatSlideToggleModule, MatButtonModule, MatMenuModule, MatIconModule],
    // RouterLinkActive es una directiva que agrega una clase CSS cuando el enlace está activo
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() themeToggled = new EventEmitter<void>();

  toggleTheme(): void {
    this.themeToggled.emit(); // sólo emite el evento
  }


  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(Dialog, {
      width: '90%',
      // height: '75%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
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

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService) {
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
      console.log(this.loginForm.value);  // Aquí verás lo que realmente está enviando
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);  // Guardar token
          // Redirigir o realizar otra acción
        },
        error: (err) => {
          console.error(err);  // Para ver el error exacto
          alert('Credenciales incorrectas');
        }
      });
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
      console.log('Estado del formulario:', this.registerForm);
      console.log('Controles:', this.registerForm.controls);

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
