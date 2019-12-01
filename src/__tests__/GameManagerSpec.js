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
});

