import { TurnManager } from '../classes';

describe('The TurnManager', () => {
    it('should be defined', () => {
        expect(TurnManager).toBeDefined();
    });

    it('should set player1 and player2 when initialized ', () => {
        const turnManager = new TurnManager({ player1: "bruce", player2: "sue" });
        expect(turnManager.player1).toEqual("bruce");
        expect(turnManager.player2).toEqual("sue");
    });
});