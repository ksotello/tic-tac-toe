import { TurnManager } from '../classes';

describe('The TurnManager', () => {
    const player1 = "bruce";
    const player2 = "sue";

    it('should be defined', () => {
        expect(TurnManager).toBeDefined();
    });

    it('should set player1 and player2 when initialized ', () => {
        const turnManager = new TurnManager({ player1, player2 });
        expect(turnManager.player1).toEqual("bruce");
        expect(turnManager.player2).toEqual("sue");
    });

    it('should keep track of turns', () => {
        const turnManager = new TurnManager({ player1, player2 });
        expect(turnManager.turnHistory[player1].turns instanceof Array).toBe(true);
        expect(turnManager.turnHistory[player2].turns instanceof Array).toBe(true);
    });

    it('should set turns', () => {
        const position1 = { x: 0, y: 7 };
        const position2 = { x: 1, y: 8 };

        const turnManager = new TurnManager({ player1, player2 });

        turnManager.setTurn({ player: player1, position: position1 });
        turnManager.setTurn({ player: player1, position: position2 });

        expect(turnManager.turnHistory[player1].turns[0]).toEqual(position1);
        expect(turnManager.turnHistory[player1].turns[1]).toEqual(position2);
    });

    it('should get turns', () => {
        const position1 = { x: 0, y: 0 };

        const turnManager = new TurnManager({ player1, player2 });

        turnManager.setTurn({ player: player1, position: position1 });

        expect(turnManager.getTurn({ player: player1, turn: 0 })).toEqual(position1);
    });

    it('should remove turns', () => {
        const position1 = { x: 0, y: 0 };
        const position2 = { x: 2, y: 8 };
        const position3 = { x: 3, y: 9 };
        const position4 = { x: 0, y: 7 };

        const turnManager = new TurnManager({ player1, player2 });

        turnManager.setTurn({ player: player1, position: position1 });
        turnManager.setTurn({ player: player1, position: position2 });
        turnManager.setTurn({ player: player1, position: position3 });
        turnManager.setTurn({ player: player1, position: position4 });

        expect(turnManager.turnHistory[player1].turns.length).toBe(4);

        turnManager.removeTurn({ player: player1, turn: 4 });
        turnManager.removeTurn({ player: player1, turn: 3 });

        expect(turnManager.turnHistory[player1].turns.length).toBe(2);
    });
});