import React, { useState, useEffect } from 'react';
import { TurnManager } from '../classes';
import { GameContext } from '../providers';

let turnCounter = 0;

const GameManager = ({ player1, player2, children }) => {
    const [currentTurn, setCurrentTurn] = useState(null);
    const [turnManager, setTurnManager] = useState(new TurnManager({ player1, player2 }));

    useEffect(() => {
        setCurrentTurn(turnCounter);
        return () => turnCounter = 0;
    }, [])

    const advanceTurn = ({ player, position }) => {
        turnManager.turnHistory[player].turns.push(position);

        setTurnManager(turnManager)
        setCurrentTurn(++turnCounter);
    };

    const reverseTurn = () => setCurrentTurn(turnCounter > 0 ? --turnCounter : 0);

    return (
        <GameContext.Provider value={{ ...turnManager, currentTurn, advanceTurn, reverseTurn }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameManager;