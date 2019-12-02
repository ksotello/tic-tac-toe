import React, { useContext } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { GameManager } from '../components';
import { GameContext } from '../providers';

describe('<GameManager />', () => {
    let wrapper;

    afterEach(() => {
        wrapper && wrapper.unmount();
        wrapper = null;
    });

    it('should mount without issue', done => {
        wrapper = mount(<GameManager />)
        expect(wrapper.exists()).toBe(true);
        done();
    });

    it('should provide turn information', done => {
        const GameManagerChild = () => {
            const { player1, player2 } = useContext(GameContext);

            return <div player1={player1} player2={player2}></div>
        };

        wrapper = mount(
            <GameManager player1="bruce" player2="sue">
                <GameManagerChild />
            </GameManager>
        );

        const props = wrapper.find("div").props();
        expect(props.player1).toEqual("bruce");
        expect(props.player2).toEqual("sue");

        done();
    });

    it('should keep track of turns', done => {
        const GameManagerChild = () => {
            const { player1, player2, currentTurn } = useContext(GameContext);

            return <div player1={player1} player2={player2}>{currentTurn}</div>
        };

        wrapper = mount(
            <GameManager player1="bruce" player2="sue">
                <GameManagerChild />
            </GameManager>
        );

        expect(wrapper.render().text()).toBe("0");
        done();
    });

    it('should advance turns', done => {
        const GameManagerChild = () => {
            const { player1, player2, currentTurn, advanceTurn } = useContext(GameContext);

            return (
                <div 
                    player1={player1}
                    player2={player2}
                    advanceTurn={advanceTurn}
                >
                    {currentTurn}
                </div>
            )
        };

        act(() => {
            wrapper = mount(
                <GameManager player1="bruce" player2="sue">
                    <GameManagerChild />
                </GameManager>
            );
        });

        const { advanceTurn } = wrapper.find("div").props();
        
        expect(wrapper.render().text()).toBe("0");
        
        act(() => {
            advanceTurn({ player: "sue", position: { x: 0, y: 7 } });
            advanceTurn({ player: "sue", position: { x: 1, y: 8 } });
            advanceTurn({ player: "sue", position: { x: 3, y: 9 } });
            advanceTurn({ player: "sue", position: { x: 0, y: 6 } });
        });
        
        expect(wrapper.render().text()).toBe("4");

        done();
    });

    it('should be able to reverse turns', done => {
        const GameManagerChild = () => {
            const { player1, player2, currentTurn, advanceTurn, reverseTurn } = useContext(GameContext);

            return (
                <div 
                    player1={player1}
                    player2={player2}
                    advanceTurn={advanceTurn}
                    reverseTurn={reverseTurn}
                >
                    {currentTurn}
                </div>
            )
        };

        act(() => {
            wrapper = mount(
                <GameManager player1="bruce" player2="sue">
                    <GameManagerChild />
                </GameManager>
            );
        });

        const { advanceTurn, reverseTurn } = wrapper.find("div").props();
        
        expect(wrapper.render().text()).toBe("0");
        
        act(() => {
            advanceTurn({ player: "bruce", position: { x: 0, y: 7 } });
            advanceTurn({ player: "sue", position: { x: 1, y: 8 } });
        });

        expect(wrapper.render().text()).toBe("2");
        
        act(() => {
            reverseTurn();
            reverseTurn();
            reverseTurn();
            reverseTurn();
            reverseTurn();
        });

        expect(wrapper.render().text()).toBe("0");

        done();
    });

    it('when it advances turns it should also advance a players move', done => {
        const GameManagerChild = () => {
            const { player1, player2, advanceTurn, turnHistory } = useContext(GameContext);

            return (
                <div 
                    player1={player1}
                    player2={player2}
                    advanceTurn={advanceTurn}
                >
                    {turnHistory[player1].turns.map(({ x, y }) => <div>[{player1} x: {x}, y: {y}]</div>)}
                    {turnHistory[player2].turns.map(({ x, y }) => <div>[{player2} x: {x}, y: {y}]</div>)}
                </div>
            )
        };

        act(() => {
            wrapper = mount(
                <GameManager player1="bruce" player2="sue">
                    <GameManagerChild />
                </GameManager>
            );
        });

        const { advanceTurn } = wrapper.find("div").props();
        
        act(() => {
            advanceTurn({ player: "bruce", position: { x: 0, y: 7 } });
            advanceTurn({ player: "sue", position: { x: 1, y: 8 } });
        });
        
        expect(wrapper.render().text()).toMatch(new RegExp(`[bruce x: 0, y: 7]`));
        expect(wrapper.render().text()).toMatch(new RegExp(`[sue x: 1, y: 8]`));

        done();
    });

    it('when it reverses turns it should also reverse a players move', done => {
        const displayCurrentTurnInfo = currentTurn => {
            if (currentTurn) {
                return `x: ${currentTurn.x}, y: ${currentTurn.y}`;
            }
        }

        const GameManagerChild = () => {
            const { player1, player2, advanceTurn, turnHistory, reverseTurn, currentTurn } = useContext(GameContext);

            return (
                <div 
                    player1={player1}
                    player2={player2}
                    advanceTurn={advanceTurn}
                    reverseTurn={reverseTurn}
                >
                    [{player1} {`${displayCurrentTurnInfo(turnHistory[player1].turns[currentTurn])}` || "[]"}]
                </div>
            )
        };

        act(() => {
            wrapper = mount(
                <GameManager player1="bruce" player2="sue">
                    <GameManagerChild />
                </GameManager>
            );
        });

        const { advanceTurn, reverseTurn } = wrapper.find("div").props();
        
        act(() => {
            advanceTurn({ player: "bruce", position: { x: 0, y: 7 } });
            advanceTurn({ player: "sue", position: { x: 1, y: 8 } });

            advanceTurn({ player: "bruce", position: { x: 0, y: 6 } });
            advanceTurn({ player: "sue", position: { x: 2, y: 9 } });
        });
        
        expect(wrapper.render().text()).toMatch(new RegExp(`[bruce x: 0, y: 6]`));
        expect(wrapper.render().text()).toMatch(new RegExp(`[sue x: 1, y: 9]`));

        act(() => {
            reverseTurn();
            reverseTurn();
        });

        expect(wrapper.render().text()).toMatch(new RegExp(`[bruce x: 0, y: 7]`));
        expect(wrapper.render().text()).toMatch(new RegExp(`[sue x: 1, y: 8]`));

        done();
    });

    it('should determine the winner of a game', done => {
        const GameManagerChild = () => {
            const {
                player1,
                player2,
                advanceTurn,
                reverseTurn,
                getWinner,
            } = useContext(GameContext);

            return (
                <div 
                    player1={player1}
                    player2={player2}
                    advanceTurn={advanceTurn}
                    reverseTurn={reverseTurn}
                >
                    {getWinner()}
                </div>
            )
        };

        act(() => {
            wrapper = mount(
                <GameManager player1="bruce" player2="sue">
                    <GameManagerChild />
                </GameManager>
            );
        });

        const { advanceTurn } = wrapper.find("div").props();

        /**
         * Game Grid
         * 
         * (0, 0), (1, 0), (2, 0)
         * (3, 1), (4, 1), (5, 1)
         * (6, 2), (7, 2) ,(8, 2)
         */
        
        act(() => {
            advanceTurn({ player: "bruce", position: { x: 0, y: 0 } });
            advanceTurn({ player: "sue", position: { x: 1, y: 0 } });

            advanceTurn({ player: "bruce", position: { x: 3, y: 1 } });
            advanceTurn({ player: "sue", position: { x: 4, y: 1 } });

            advanceTurn({ player: "bruce", position: { x: 6, y: 2 } });
        });
        
        expect(wrapper.render().text()).toEqual("bruce");

        done();
    });
});

