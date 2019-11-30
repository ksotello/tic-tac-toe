import React, { useContext } from 'react';
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

        const wrapper = mount(
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
            const { player1, player2, getCurrentTurn } = useContext(GameContext);

            return <div player1={player1} player2={player2} getCurrentTurn={getCurrentTurn}></div>
        };

        const wrapper = mount(
            <GameManager player1="bruce" player2="sue">
                <GameManagerChild />
            </GameManager>
        );

        const { getCurrentTurn } = wrapper.find("div").props();
        expect(getCurrentTurn()).toBe(0);
        done();
    });
});

