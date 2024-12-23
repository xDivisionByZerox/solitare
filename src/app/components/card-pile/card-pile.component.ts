import { Component, computed, input } from '@angular/core';
import { PlayCardComponent } from '../play-card/play-card.component';
import { PlayCard } from '../../models/card';

@Component({
  selector: 'app-card-pile',
  template: `
    @for (card of cards(); track card) {
      <app-play-card
        [card]="card"
        [isFrontUp]="$last"
        [style.z-index]="$index"
        [style.transform]="mode() === 'stack' ? null : 'translateY(' + 16 * $index + 'px)'"
      />
    }
  `,
  styles: `
    :host {
      display: block;
      outline-color: black;
      outline-style: dotted;
      position: relative;
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
  readonly mode = input<'stack' | 'stacked-row'>('stack');

  readonly height = computed(() => (this.width() / 2) * 3);
}
