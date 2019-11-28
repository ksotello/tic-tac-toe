import React from 'react';
import { mount } from 'enzyme';

import { Space } from '../components';

describe('<Space />', () => {
    let wrapper;

    afterEach(() => {
        wrapper && wrapper.unmount();
        wrapper = null;
    });

    it('should mount without issue', done => {
        wrapper = mount(<Space />)
        expect(wrapper.exists()).toBe(true);
        done();
    });

});

