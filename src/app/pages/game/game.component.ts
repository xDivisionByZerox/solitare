import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, map, tap } from 'rxjs';
import { CardPileComponent } from '../../components/card-pile/card-pile.component';
import { GameStateService } from '../../services/game-state.service';

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
    const gapTotal = gap * this.state.cardPiles().length - 1;
    return Math.floor((this.windowWidth() - paddingTotal - gapTotal) / this.state.cardPiles().length);
  });

  constructor() {
    effect(() => console.log({
      windowWidth: this.windowWidth(),
      cardWidth: this.cardWidth(),
    }))
  }
}
