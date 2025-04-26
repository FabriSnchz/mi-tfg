import { ChangeDetectionStrategy, Component, inject, OnInit, Inject } from '@angular/core';
import { Juego } from '../juegos';
import { JuegosService } from '../juegos.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent,  MatDialogRef,  MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
    selector: 'app-juegos',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush, // Se utiliza para mejorar el rendimiento de la aplicación al evitar la detección de cambios innecesarios.
    templateUrl: './juegos.component.html',
    styleUrl: './juegos.component.scss'
})
export class JuegosComponent implements OnInit {
  juegos: Juego[] = [];
  juegosFiltrados: Juego[] = [];
  readonly dialog = inject(MatDialog);
  constructor(private readonly juegosService: JuegosService) {}

  ngOnInit(): void {
    this.juegosService.emitirJuegos(); // Dispara la carga inicial de juegos
    this.juegosService.juegos$.subscribe(juegos => {
      this.juegos = juegos;
      this.juegosFiltrados = juegos; // Inicializa los juegos filtrados con todos los juegos
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, juego: Juego): void {
    this.dialog.open(Dialog, {
      width: '90%',
      height: '75%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { selectedJuego: juego } // Pasa el juego seleccionado al diálogo
    });
  }

  filtrarResultado(texto: string) {
    if (!texto) {
      this.juegosFiltrados = this.juegos;
      return;
    }
    this.juegosFiltrados = this.juegos.filter(
      juegosFiltrados =>
  juegosFiltrados?.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  }
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
  styleUrl: 'juegos.component.scss',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  selectedJuego: Juego | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedJuego: Juego },
    private readonly juegosService: JuegosService) {
      this.selectedJuego = data.selectedJuego;
      }
  readonly dialogRef = inject(MatDialogRef<Dialog>);
}
