import React from 'react';
import { mount } from 'enzyme';

import { GameGrid } from '../components';

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

});

