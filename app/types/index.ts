export interface Card {
    code: string;
    image: string;
    value: string;
    suit: string;
  }
  
  export interface DeckResponse {
    deck_id: string;
    remaining: number;
    shuffled: boolean;
    success: boolean;
  }
  
  export interface DrawCardResponse {
    cards: Card[];
    deck_id: string;
    remaining: number;
    success: boolean;
  }