import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion'

@Component({
    selector: 'app-contacto',
    standalone: true,
    imports: [MatIconModule, MatExpansionModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contacto.component.html',
    styleUrl: './contacto.component.scss'
})
export class ContactoComponent {
}
