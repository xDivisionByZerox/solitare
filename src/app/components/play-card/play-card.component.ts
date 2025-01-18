import { Component, computed, input } from '@angular/core';
import { PlayCard } from '../../models/card';

@Component({
  selector: 'app-play-card',
  template: `
    @if (isFrontUp()) {
      <div class="card-front">
        <img [src]="symbolUrl()" draggable="false" style="top: 0; left: 0;" />
        <span [style.color]="cardFontColor()">{{ card().value }}</span>
        <img [src]="symbolUrl()" draggable="false" style="margin-left: auto; right: 0; bottom: 0;" />
      </div>
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

      --spacing: 2px;
      padding: var(--spacing);
      height: calc(100% - 2 * var(--spacing));
      width: calc(100% - 2 * var(--spacing));
    }

    .card-front {
      max-width: 100%;
      max-height: 100%;
      height: 100%;
      overflow: hidden;

      display: flex;
      flex-direction: column;
      position: relative;
    }

    img {
      width: 40%;
      pointer-events: none;
      position: absolute;
    }

    span {
      font-size: 8vw;
      font-weight: bold;
      text-align: center;
      margin: auto;
    }

    .card-back {
      max-height: 100%;
      max-width: 100%;
      height: 100%;
    }

    .card-back-background {
      width: 100%;
      height: 100%;

      --size: 8px;
      background-image: linear-gradient(
          45deg,
          var(--color-red) 25%,
          transparent 25%,
          transparent 75%,
          var(--color-red) 75%,
          var(--color-red)
        ),
        linear-gradient(
          -45deg,
          var(--color-red) 25%,
          transparent 25%,
          transparent 75%,
          var(--color-red) 75%,
          var(--color-red)
        );
      background-size: var(--size) var(--size);
      background-repeat: repeat;
    }
  `,
})
export class PlayCardComponent {
  readonly card = input.required<PlayCard>();
  readonly isFrontUp = input.required<boolean>();

  readonly cardFontColor = computed(() => (this.card().color === 'BLACK' ? '#000000' : 'var(--color-red)'));
  readonly symbolUrl = computed(() => {
    switch (this.card().type) {
      case 'CLUBS':
        return '/cards/clubs.svg';
      case 'DIAMONDS':
        return '/cards/diamonds.svg';
      case 'HEARTS':
        return '/cards/hearts.svg';
      case 'SPADES':
        return '/cards/spades.svg';
    }
  });
}
