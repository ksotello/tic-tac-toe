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
            const gameContext = useContext(GameContext);

            return <div {...gameContext}></div>
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
});

