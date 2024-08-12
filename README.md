# Blackjack Game

This is a simple Blackjack game built with Next.js, React, and Material-UI. It uses the Deck of Cards API to simulate a real deck of cards.

## Features

- Play Blackjack against the house
- Hit or stand during your turn
- Automatic detection of Blackjack (21 on initial deal)
- Score tracking (wins, losses, ties)
- Responsive design using Material-UI components
- Deck management with automatic shuffling when cards run out
- Reset game and scores functionality

## Prerequisites

- Node.js 18.17 or later

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Play

1. Click "Start Game" to begin a new round
2. You'll be dealt two cards, and the house will be dealt two cards
3. Choose to "Hit" (take another card) or "Stand" (keep your current hand)
4. Try to get as close to 21 as possible without going over
5. If you go over 21, you "bust" and lose the round
6. After you stand, the house will play its hand
7. The player closest to 21 without going over wins
8. If the deck runs out of cards, you'll need to reset the game and scores

## Project Structure

- `app/page.tsx`: Main game component
- `app/components/`: React components for the game (Hand, Card, Controls)
- `app/hooks/useDeck.ts`: Custom hook for managing the deck of cards
- `app/utils/calcHand.ts`: Utility function for calculating hand value
- `app/types/index.ts`: TypeScript interfaces for the project
- `app/styles/globals.css`: Global styles for the application
- `app/_document.js`: Custom Document component for Next.js
- `app/layout.tsx`: Root layout component

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Material-UI (MUI)
- Emotion for styling
- Axios for API calls
- Deck of Cards API
- Tailwind CSS (configured but not actively used)

## API Reference

This project uses the [Deck of Cards API](https://deckofcardsapi.com/) for card management.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).