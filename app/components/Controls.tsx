import React from 'react';
import { Button, Box } from '@mui/material';

interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onNewGame: () => void;
  gameOver: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({ onHit, onStand, onNewGame, gameOver }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      {!gameOver && (
        <>
          <Button variant="contained" onClick={onHit} sx={{ marginRight: 1 }}>Hit</Button>
          <Button variant="contained" onClick={onStand}>Stand</Button>
        </>
      )}
      {gameOver && <Button variant="contained" onClick={onNewGame}>New Game</Button>}
    </Box>
  );
};