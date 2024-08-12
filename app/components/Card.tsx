import React from 'react';
import { Card as CardType } from '../types';
import { Card as MUICard, CardMedia } from '@mui/material';

interface CardProps {
  card: CardType;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <MUICard sx={{ width: 100, margin: 1 }}>
      <CardMedia
        component="img"
        height="140"
        image={card.image}
        alt={`${card.value} of ${card.suit}`}
      />
    </MUICard>
  );
};