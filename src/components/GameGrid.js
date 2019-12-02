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

export default () => (
    <Grid container className="--wrapper">
        {generateSpaces().map((space, index) => {
            return React.createElement(space, { index });
        })}
    </Grid>
)
