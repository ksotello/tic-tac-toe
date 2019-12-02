import React, { useState, useEffect } from 'react';
import { TurnManager } from '../classes';
import { GameContext } from '../providers';

let turnCounter = 0;

const GameManager = ({ player1, player2, children }) => {
    const [currentTurn, setCurrentTurn] = useState(null);
    const [winningPlayer, setWinningPlayer] = useState(null);
    const [turnManager, setTurnManager] = useState(new TurnManager({ player1, player2 }));

    useEffect(() => {
        setCurrentTurn(turnCounter);
        return () => turnCounter = 0;
    }, [])

    const isWinner = ({ player }) => {
        const turns = turnManager.turnHistory[player].turns;

        /**
         * Game Grid
         * 
         * (0, 0), (1, 0), (2, 0)
         * (3, 1), (4, 1), (5, 1)
         * (6, 2), (7, 2) ,(8, 2)
         */

        // check all horizontals
        const h1 = turns.filter(({ x, y }) => (x === 0 && y === 0) || (x === 1 && y === 0) || (x === 2 && y === 0));
        const h2 = turns.filter(({ x, y }) => (x === 3 && y === 1) || (x === 4 && y === 1) || (x === 5 && y === 1));
        const h3 = turns.filter(({ x, y }) => (x === 6 && y === 2) || (x === 7 && y === 2) || (x === 8 && y === 2));

        // check all verticals
        const v1 = turns.filter(({ x, y }) => (x === 0 && y === 0) || (x === 3 && y === 1) || (x === 6 && y === 2));
        const v2 = turns.filter(({ x, y }) => (x === 1 && y === 0) || (x === 4 && y === 1) || (x === 7 && y === 2));
        const v3 = turns.filter(({ x, y }) => (x === 2 && y === 0) || (x === 5 && y === 1) || (x === 8 && y === 2));

        // check diagonals
        const d1 = turns.filter(({ x, y }) => (x === 0 && y === 0) || (x === 4 && y === 1) || (x === 8 && y === 2));
        const d2 = turns.filter(({ x, y }) => (x === 2 && y === 0) || (x === 4 && y === 1) || (x === 6 && y === 2));

        return (
            (h1.length === 3 || h2.length === 3 || h3.length === 3) ||
            (v1.length === 3 || v2.length === 3 || v3.length === 3) ||
            (d1.length === 3 || d2.length === 3)
        );
    };

    const advanceTurn = ({ player, position }) => {
        turnManager.turnHistory[player].turns.push(position);

        setTurnManager(turnManager)
        setCurrentTurn(++turnCounter);
        
        if (isWinner({ player })) {
            setWinningPlayer(player);
        }
    };

    const reverseTurn = () => setCurrentTurn(turnCounter > 0 ? --turnCounter : 0);

    const getWinner = () => winningPlayer;

    return (
        <GameContext.Provider value={{ 
            ...turnManager,
            currentTurn,
            advanceTurn,
            reverseTurn,
            getWinner,
        }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameManager;