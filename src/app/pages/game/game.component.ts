import { Component, computed, effect, inject, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, map, tap } from 'rxjs';
import { CardPileComponent } from '../../components/card-pile/card-pile.component';
import { GameStateService } from '../../services/game-state.service';
import { PlayCard, PlayCardColor, PlayCardValue } from '../../models/card';

const DISCARD_PILE_CARD_ORDER: PlayCardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const PLAYING_PILE_CARD_ORDER: PlayCardValue[] = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'A'];

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  providers: [GameStateService],
  imports: [CardPileComponent],
})
export class GameComponent {
  readonly state = inject(GameStateService);

  private readonly windowWidth = toSignal(
    fromEvent(window, 'resize').pipe(
      debounceTime(200),
      tap(() => console.log('rezise')),
      map(() => window.innerWidth),
    ),
    { initialValue: window.innerWidth },
  );
  readonly cardWidth = computed(() => {
    const padding = 8;
    const paddingTotal = padding * 2;
    const gap = 8;
    const gapTotal = gap * this.state.cardPiles.length - 1;
    return Math.floor((this.windowWidth() - paddingTotal - gapTotal) / this.state.cardPiles.length);
  });

  cardAction(card: PlayCard, pileCardIsFrom: WritableSignal<PlayCard[]>): void {
    const discardPile = this.state.discardPiles.find((pile) => {
      const topCard = pile()[pile.length - 1];
      const correctValue = this.canPlaceCardOnCardByValue({
        cardOnPile: topCard,
        cardToPlace: card,
        cardOrder: DISCARD_PILE_CARD_ORDER,
      });
      if (!correctValue) {
        return false;
      } else if (!topCard) {
        return true;
      } else {
        return card.type === topCard.type;
      }
    });
    if (discardPile) {
      this.moveCardToPile(card, pileCardIsFrom, discardPile);
      return;
    } else {
      console.log('no discard pile matches');
    }

    const normalPile = this.state.cardPiles.find((pile) => {
      const topCard = pile()[pile().length - 1];
      const correctValue = this.canPlaceCardOnCardByValue({
        cardOnPile: topCard,
        cardToPlace: card,
        cardOrder: PLAYING_PILE_CARD_ORDER,
      });
      if (!correctValue) {
        return false;
      } else if (!topCard) {
        return true;
      } else {
        const requiredColor: PlayCardColor = topCard.color === 'BLACK' ? 'RED' : 'BLACK';
        return card.color === requiredColor;
      }
    });
    if (normalPile) {
      this.moveCardToPile(card, pileCardIsFrom, normalPile);
      return;
    } else {
      console.log('no normal pile matches');
    }
  }

  private moveCardToPile(card: PlayCard, fromPile: WritableSignal<PlayCard[]>, toPile: WritableSignal<PlayCard[]>) {
    fromPile.update((pile) => {
      console.log('Updating pile', JSON.stringify(pile));
      pile.splice(pile.length - 1, 1);
      console.log('pile after splicing', JSON.stringify(pile));
      const newTopCard = pile[pile.length - 1];
      if(newTopCard) {
        newTopCard.isVisable = true;
        console.log('pile after setting new viable state', JSON.stringify(pile));
      }
      return pile;
    });
    toPile.update((pile) => {
      pile.push(card);
      return pile;
    });
  }

  private canPlaceCardOnCardByValue(options: {
    cardOrder: PlayCardValue[];
    cardOnPile: PlayCard | undefined;
    cardToPlace: PlayCard;
  }): boolean {
    const { cardOnPile, cardToPlace, cardOrder } = options;
    const pileCardIndex = cardOrder.findIndex((v) => v === cardOnPile?.value);
    return pileCardIndex + 1 === cardOrder.findIndex((v) => v === cardToPlace.value);
  }
}
