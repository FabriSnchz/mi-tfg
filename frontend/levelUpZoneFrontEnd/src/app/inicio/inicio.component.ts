import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';




@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss'
})
export class InicioComponent {


  slides: string[] = [
    'https://cdn.pixabay.com/photo/2024/05/04/01/37/retro-8738140_1280.jpg',
    'https://cdn.pixabay.com/photo/2024/09/30/03/56/retro-9084614_1280.png',
    'https://cdn.pixabay.com/photo/2022/12/14/19/32/death-knight-7656097_1280.jpg',
    'https://cdn.pixabay.com/photo/2020/01/10/14/18/war-4755403_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/10/04/06/45/war-472611_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/06/27/10/06/game-3501200_1280.jpg',
  ];
  selectedSlide: number = 0;  // Inicializa la imagen seleccionada

  selectSlide(index: number) {
    this.selectedSlide = index;  // Cambia la imagen seleccionada
  }
}
