import { Injectable, signal } from '@angular/core';
import { PlayCard, PlayCardType, PlayCardValue } from '../models/card';

const ALL_TYPES: PlayCardType[] = ['CLUBS', 'SPADES', 'HEARTS', 'DIAMONDS'];
const ALL_VALUES: PlayCardValue[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const ALL_CARD_VARIANTS = ALL_TYPES.flatMap((type) => ALL_VALUES.map((value) => ({ type, value })));

function reverseArray<T>(arr: T[]) {
  const result: T[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }

  return result;
}

function getAllCardsInRandomOrder(shuffleItterations = 10): PlayCard[] {
  let result: PlayCard[] = ALL_CARD_VARIANTS.map(({ type, value }) => new PlayCard(type, value));
  for (let i = 0; i < shuffleItterations; i++) {
    const ref = result;
    result = [];
    while (ref.length > 0) {
      result.push(...ref.splice(Math.floor(Math.random() * ref.length), 1));
    }
  }

  return result;
}

@Injectable()
export class GameStateService {
  private readonly drawPileSide = signal<PlayCard[]>([]);

  readonly drawPile = signal<PlayCard[]>([]);
  readonly activeDrawCards = signal<PlayCard[]>([]);

  readonly cardPiles = [
    signal<PlayCard[]>([]),
    signal<PlayCard[]>([]),
    signal<PlayCard[]>([]),
    signal<PlayCard[]>([]),
    signal<PlayCard[]>([]),
    signal<PlayCard[]>([]),
    signal<PlayCard[]>([]),
  ];
  readonly discardPiles = [
    signal<PlayCard[]>([]),
    signal<PlayCard[]>([]),
    signal<PlayCard[]>([]),
    signal<PlayCard[]>([]),
  ];

  constructor() {
    const cards = getAllCardsInRandomOrder();
    for (let pileIndex = 0; pileIndex < this.cardPiles.length; pileIndex++) {
      const maxCardsOfPile = pileIndex + 1;
      const pile = this.cardPiles[pileIndex];
      while (pile().length < maxCardsOfPile) {
        const card = cards.pop();
        if (card) {
          pile.update((p) => {
            p.push(card);
            return p;
          });
        } else {
          console.warn('To less cards to deal for all piles. This is weird. This case should not happen...');
          break;
        }
      }

      pile()[pile().length - 1].isVisable = true;
    }

    this.drawPile.update((pile) => {
      pile.push(...cards);
      return pile;
    });
  }

  drawNextCards() {
    this.drawPileSide.update((side) => [...side, ...reverseArray(this.activeDrawCards())]);

    if (this.drawPile().length <= 0) {
      this.drawPile.update(() =>
        this.drawPileSide().map((card) => {
          card.isVisable = false;
          return card;
        }),
      );
      this.activeDrawCards.update(() => []);
      this.drawPileSide.update(() => []);
      return;
    }

    this.activeDrawCards.update(() => {
      const newDraw = this.drawPile().slice(0, 3);
      for (const card of newDraw) {
        card.isVisable = true;
      }

      return reverseArray(newDraw);
    });
    this.drawPile.update((pile) => pile.filter((_, index) => index > 2));
    console.log('new draw pile', JSON.stringify(this.drawPile().map(c => c.id)))
  }
}
