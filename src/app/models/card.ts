export type PlayCardType = 'CLUBS' | 'SPADES' | 'HEARTS' | 'DIAMONDS';
export type PlayCardColor = 'BLACK' | 'RED';
export type PlayCardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export class PlayCard {
  readonly color: PlayCardColor;
  isVisable = false;

  constructor(
    readonly type: PlayCardType,
    readonly value: PlayCardValue,
  ) {
    this.color = this.type === 'CLUBS' || this.type === 'SPADES' ? 'BLACK' : 'RED';
  }
}
