import React from 'react';
import { TurnManager } from '../classes';
import { GameContext } from '../providers';

const GameManager = ({ player1, player2, children }) => {
    const turnManager = new TurnManager({ player1, player2 });
    let currentTurn = 0;

    const getCurrentTurn = () => currentTurn;
    const advanceTurn = () => ++currentTurn;

    return (
        <GameContext.Provider value={{ ...turnManager, getCurrentTurn, advanceTurn }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameManager;