import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, DeckResponse, DrawCardResponse } from '../types';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

export const useDeck = () => {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    initializeDeck();
  }, []);

  const initializeDeck = async () => {
    try {
      const response = await axios.get<DeckResponse>(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
      setDeckId(response.data.deck_id);
      setRemaining(response.data.remaining);
    } catch (error) {
      console.error('Error initializing deck:', error);
    }
  };

  const drawCards = async (count: number): Promise<Card[]> => {
    if (!deckId) return [];

    try {
      const response = await axios.get<DrawCardResponse>(`${API_BASE_URL}/${deckId}/draw/?count=${count}`);
      setRemaining(response.data.remaining);
      return response.data.cards;
    } catch (error) {
      console.error('Error drawing cards:', error);
      return [];
    }
  };

  const shuffleDeck = async () => {
    if (!deckId) return;

    try {
      await axios.get(`${API_BASE_URL}/${deckId}/shuffle/`);
      setRemaining(52);
    } catch (error) {
      console.error('Error shuffling deck:', error);
    }
  };

  return { drawCards, shuffleDeck, remaining };
};