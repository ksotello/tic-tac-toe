import React from 'react';
import { Grid } from '@material-ui/core';

const Space = ({ value, x, y, key }) => <Grid item key={key} x={x} y={y} xs={4}>{value}</Grid>

export default Space;
