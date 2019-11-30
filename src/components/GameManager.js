import React from 'react';
import { TurnManager } from '../classes';
import { GameContext } from '../providers';

const GameManager = ({ player1, player2, children }) => {
    const turnManager = new TurnManager({ player1, player2 });
    let currentTurn = 0;

    const getCurrentTurn = () => currentTurn;
    const advanceTurn = () => ++currentTurn;
    const reverseTurn = () => currentTurn > 0 ? --currentTurn : currentTurn = 0;

    return (
        <GameContext.Provider value={{ ...turnManager, getCurrentTurn, advanceTurn, reverseTurn }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameManager;