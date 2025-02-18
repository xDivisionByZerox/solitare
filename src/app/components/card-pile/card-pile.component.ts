import { Component, computed, input, output } from '@angular/core';
import { PlayCardComponent } from '../play-card/play-card.component';
import { PlayCard } from '../../models/card';

@Component({
  selector: 'app-card-pile',
  template: `
    @for (card of cards(); track card.id) {
      <app-play-card
        [card]="card"
        [isFrontUp]="card.isVisable"
        [style.z-index]="$index"
        [style.transform]="getTransform($index)"
        (click)="onCardClicked.emit(card)"
      />
    }
  `,
  styles: `
    :host {
      display: block;
      outline-color: black;
      outline-style: dotted;
      position: relative;
      background: rgba(255, 255, 255, 0.5);
    }

    app-play-card {
      position: absolute;
      inset: 0;
    }
  `,
  host: {
    '[style.width.px]': 'width()',
    '[style.height.px]': 'height()',
    '[style.outline-width.px]': 'cards().length > 0 ? 0 : 2',
  },
  imports: [PlayCardComponent],
})
export class CardPileComponent {
  readonly width = input<number>(0);
  readonly cards = input<PlayCard[]>([]);
  readonly mode = input<'stack' | 'column' | 'row'>('stack');

  readonly onCardClicked = output<PlayCard>();

  readonly height = computed(() => (this.width() / 2) * 3);
  private readonly transformTranslateOffset = 32;

  getTransform(index: number): string | null {
    switch (this.mode()) {
      case 'column':
        return `translateY(${this.transformTranslateOffset * index}px)`;
      case 'row':
        return `translateX(-${this.transformTranslateOffset * index}px)`;
      default:
        return null;
    }
  }

  cardClicked(card: PlayCard) {}
}
