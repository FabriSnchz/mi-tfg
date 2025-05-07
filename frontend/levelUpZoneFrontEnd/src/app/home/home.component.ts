import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, CarouselModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

  titleLetters = [
    { src: 'l.png', alt: 'L' },
    { src: 'e.png', alt: 'E' },
    { src: 'v.png', alt: 'V' },
    { src: 'e.png', alt: 'E' },
    { src: 'l.png', alt: 'L' },
    { src: 'u.png', alt: 'U' },
    { src: 'p.png', alt: 'P' },
    { src: 'z.png', alt: 'Z' },
    { src: 'o.png', alt: 'O' },
    { src: 'n.png', alt: 'N' },
    { src: 'e.png', alt: 'E' }
  ];

  slides = [
    {
      image: 'https://cdn.pixabay.com/photo/2024/05/04/01/37/retro-8738140_1280.jpg',
      text: 'Pixel Noir: El nuevo RPG de misterio que combina arte retro y narrativa cinematográfica'

    },
    {
      image: 'https://cdn.pixabay.com/photo/2024/09/30/03/56/retro-9084614_1280.png',
      text: 'Regreso al 8-Bit: Nintendo revive la nostalgia con una edición especial de la NES'
    },
    {
      image: 'https://cdn.pixabay.com/photo/2022/12/14/19/32/death-knight-7656097_1280.jpg',
      text: 'El Renacer del Guerrero: Se filtran imágenes del nuevo villano de Dark Realms IV'
    },
    {
      image: 'https://cdn.pixabay.com/photo/2020/01/10/14/18/war-4755403_1280.jpg',
      text: 'Los jueguetes del videojuego más esperado del año: ¡Ya están aquí!'
    },
    {
      image: 'https://cdn.pixabay.com/photo/2014/10/04/06/45/war-472611_1280.jpg',
      text: 'Los videojuegos más esperados de 2024: ¡No te los pierdas!'
    },
    {
      image: 'https://cdn.pixabay.com/photo/2018/06/27/10/06/game-3501200_1280.jpg',
      text: 'Las consolas antiguas que están volviendo a la vida: ¡Descúbrelas!'
    }
  ];

  customOptions = {
    items: 1,
    loop: true,
    center: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  };
}
