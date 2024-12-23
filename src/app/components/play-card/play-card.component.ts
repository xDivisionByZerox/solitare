import { Component, input } from '@angular/core';
import { CardImagePipe } from '../../pipes/card-image.pipe';
import { PlayCard } from '../../models/card';

@Component({
  selector: 'app-play-card',
  imports: [CardImagePipe],
  template: `
    @if (isFrontUp()) {
      <img [src]="card() | cardImage" draggable="false" />
    } @else {
      <div class="card-back">
        <div class="card-back-background"></div>
      </div>
    }
  `,
  styles: `
    :host {
      max-width: 100%;
      max-height: 100%;
      height: 100%;
      display: block;
      background-color: #fff;
      outline: 1px solid black;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      pointer-events: none;
    }

    .card-back {
      padding: 2px;
      max-height: 100%;
      max-width: 100%;
      height: 100%;
    }

    .card-back-background {
      background-image: url('/cards/backgrounds/diamond.svg');
      background-repeat: repeat;
      background-size: 4px;
      height: 100%;
      width: 100%;
    }
  `,
})
export class PlayCardComponent {
  readonly card = input.required<PlayCard>();
  readonly isFrontUp = input.required<boolean>();
}
