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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      // aquí iría el servicio de login
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      console.log('Registro:', this.registerForm.value);
      // aquí iría el servicio de registro
    }
  }


  toggleRegister(showRegister: boolean): void {
    this.isRegisterMode = showRegister;
  }

  readonly dialogRef = inject(MatDialogRef<Dialog>);
}
