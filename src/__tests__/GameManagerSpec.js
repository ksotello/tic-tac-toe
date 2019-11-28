import React from 'react';
import { mount } from 'enzyme';

import { GameManager } from '../components';

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
});

