import { Component } from '@angular/core';
import { CardComponent } from '../../components/elements/card/card.component';
import { svg } from '../../data/svg-data';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css',
})
export class StartPageComponent {
  svgs = svg;
}
