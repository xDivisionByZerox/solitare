export type PlayCardType = 'CLUBS' | 'SPADES' | 'HEARTS' | 'DIAMONDS';
export type PlayCardColor = 'BLACK' | 'RED';
export type PlayCardValue = '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export class PlayCard {
  readonly color: PlayCardColor;

  constructor(
    readonly type: PlayCardType,
    readonly value: PlayCardValue,
  ) {
    this.color = this.type === 'CLUBS' || this.type === 'SPADES' ? 'BLACK' : 'RED';
  }
}