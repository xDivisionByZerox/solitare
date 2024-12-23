import { Pipe, PipeTransform } from '@angular/core';
import { PlayCard } from '../models/card';

@Pipe({
  name: 'cardImage'
})
export class CardImagePipe implements PipeTransform {

  transform(card: PlayCard): string {
    return `/cards/${card.type.toLowerCase()}/${card.value}.svg`;
  }

}
