
class TurnManager {
    constructor({ player1, player2 }) {
        this.player1 = player1;
        this.player2 = player2;

        this.turnHistory = {
            [player1]: {
                turns: []
            },
            [player2]: {
                turns: []
            }
        }
    }
}

export default TurnManager;