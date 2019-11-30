import React from 'react';
import { TurnManager } from '../classes';
import { GameContext } from '../providers';

const GameManager = ({ player1, player2, children }) => {
    const turnManager = new TurnManager({ player1, player2 });

    return (
        <GameContext.Provider value={turnManager}>
            {children}
        </GameContext.Provider>
    );
};

export default GameManager;