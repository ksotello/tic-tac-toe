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
    })
});