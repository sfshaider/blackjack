import { Card } from '../types';

export const calcHand = (hand: Card[]): number => {
  let value = 0;
  let aceCount = 0;

  for (const card of hand) {
    if (card.value === 'ACE') {
      aceCount++;
    } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  }

  for (let i = 0; i < aceCount; i++) {
    if (value + 11 <= 21) {
      value += 11;
    } else {
      value += 1;
    }
  }

  return value;
};