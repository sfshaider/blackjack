import React from 'react';
import { Card as CardType } from '../types';
import { Card } from './Card';
import { calcHand } from '../utils/calcHand';
import { Box, Typography } from '@mui/material';

interface HandProps {
  cards: CardType[];
  label: string;
}

export const Hand: React.FC<HandProps> = ({ cards, label }) => {
  const handValue = calcHand(cards);

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom>
        {label} (Value: {handValue})
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map((card) => (
          <Card key={card.code} card={card} />
        ))}
      </Box>
    </Box>
  );
};