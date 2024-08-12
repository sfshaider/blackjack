'use client'

import React, { useState } from 'react';
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme, Button } from '@mui/material';
import { Hand } from './components/Hand';
import { GameControls } from './components/Controls';
import { useDeck } from './hooks/useDeck';
import { Card } from './types';
import { calcHand } from './utils/calcHand';

const theme = createTheme();

export default function Home() {
  const { drawCards, shuffleDeck, remaining } = useDeck();
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [houseHand, setHouseHand] = useState<Card[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [scores, setScores] = useState({ wins: 0, losses: 0, ties: 0 });
  const [needsReset, setNeedsReset] = useState(false);

  const startGame = async () => {
    if (remaining < 4) {
      setNeedsReset(true);
      return;
    }
    
    const [playerCards, houseCards] = await Promise.all([
      drawCards(2),
      drawCards(2)
    ]);
    setPlayerHand(playerCards);
    setHouseHand(houseCards);
    setGameOver(false);
    setResult('');
    setGameStarted(true);
    setNeedsReset(false);

    const playerValue = calcHand(playerCards);
    const houseValue = calcHand(houseCards);

    if (playerValue === 21 && houseValue === 21) {
      endGame("Both have Blackjack! It's a tie.");
    } else if (playerValue === 21) {
      endGame("You have Blackjack! You win!");
    }
  };

  const hit = async () => {
    if (remaining < 1) {
      setNeedsReset(true);
      return;
    }
    
    const [newCard] = await drawCards(1);
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);

    if (calcHand(newHand) > 21) {
      endGame('You bust! House wins.');
    }
  };

  const stand = () => {
    const playerValue = calcHand(playerHand);
    const houseValue = calcHand(houseHand);

    if (playerValue > 21) {
      endGame('You bust! House wins.');
    } else if (playerValue > houseValue) {
      endGame('You win!');
    } else if (playerValue < houseValue) {
      endGame('House wins!');
    } else {
      endGame('It\'s a tie!');
    }
  };

  const endGame = (message: string) => {
    setGameOver(true);
    setResult(message);
    updateScores(message);
  };

  const updateScores = (result: string) => {
    setScores(prevScores => {
      if (result.includes('You win')) {
        return { ...prevScores, wins: prevScores.wins + 1 };
      } else if (result.includes('House wins')) {
        return { ...prevScores, losses: prevScores.losses + 1 };
      } else {
        return { ...prevScores, ties: prevScores.ties + 1 };
      }
    });
  };

  const resetGame = async () => {
    await shuffleDeck();
    setScores({ wins: 0, losses: 0, ties: 0 });
    setGameStarted(false);
    setNeedsReset(false);
    setPlayerHand([]);
    setHouseHand([]);
    setResult('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Blackjack
          </Typography>
          {needsReset ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button variant="contained" onClick={resetGame}>Reset Game and Scores</Button>
            </Box>
          ) : !gameStarted ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button variant="contained" onClick={startGame}>Start Game</Button>
            </Box>
          ) : (
            <>
              <Hand cards={playerHand} label="Your Hand" />
              <Hand cards={houseHand} label="House Hand" />
              <GameControls
                onHit={hit}
                onStand={stand}
                onNewGame={startGame}
                gameOver={gameOver}
              />
              {result && (
                <Typography variant="h5" sx={{ mt: 2 }} align="center">
                  {result}
                </Typography>
              )}
            </>
          )}
          <Typography variant="body1" sx={{ mt: 2 }} align="center">
            Cards remaining in deck: {remaining}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }} align="center">
            Wins: {scores.wins} | Losses: {scores.losses} | Ties: {scores.ties}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}