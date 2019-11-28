import React from 'react';
import { mount } from 'enzyme';

import { GameGrid, Space } from '../components';

describe('<GameGrid />', () => {
    let wrapper;

    afterEach(() => {
        wrapper && wrapper.unmount();
        wrapper = null;
    });

    it('should mount without issue', done => {
        wrapper = mount(<GameGrid />)
        expect(wrapper.exists()).toBe(true);
        done();
    });

    it('should display a grid with 9 spaces', done => {
        wrapper = mount(<GameGrid />);
        expect(wrapper.find(Space).length).toEqual(9)
        done();
    });

});

