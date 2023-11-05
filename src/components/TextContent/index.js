// src/components/TextContent/index.js
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textContainer: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
}));

const TextContent = ({ title, content }) => {
    const classes = useStyles();

    return (
        <div className={classes.textContainer}>
            <Typography variant="h5" className={classes.title}>
                {title}
            </Typography>
            <Typography variant="body1">
                {content}
            </Typography>
        </div>
    );
};

export default TextContent;
