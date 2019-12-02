import React from 'react';
import { Grid } from '@material-ui/core';

import { Space } from "."

const generateSpaces = () => {
    let spaces = [];

    for (let i = 0; i < 9; i++) {
        spaces.push(Space);
    }

    return spaces;
}

const getY = index => {
    if (index <= 2) {
        return 0;
    } else if (index > 2 && index <= 5) {
        return 1;
    } else {
        return 2;
    }
}

export default () => (
    <Grid container className="--wrapper">
        {generateSpaces().map((space, index) => {
            console.log(index);
            return React.createElement(space, { x: index, y: getY(index), key: index, value: "X" });
        })}
    </Grid>
)
