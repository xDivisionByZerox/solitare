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
      max-height: 100%;
      max-width: 100%;
      height: 100%;
    }

    .card-back-background {
      --spacing: 2px;
      --size: 8px;
      background-image: linear-gradient(45deg, #ff0000 25%, transparent 25%, transparent 75%, #ff0000 75%, #ff0000),
        linear-gradient(-45deg, #ff0000 25%, transparent 25%, transparent 75%, #ff0000 75%, #ff0000);
      background-size: var(--size) var(--size);
      background-repeat: repeat;
      margin: var(--spacing);
      height: calc(100% - 2 * var(--spacing));
      width: calc(100% - 2 * var(--spacing));
    }
  `,
})
export class PlayCardComponent {
  readonly card = input.required<PlayCard>();
  readonly isFrontUp = input.required<boolean>();
}
