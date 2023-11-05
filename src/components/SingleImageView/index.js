import React from 'react';
import { Card, CardMedia, CardContent, List, ListItem, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    image: {
        border: '2px solid transparent',
        cursor: 'pointer',
    },
    selectedImage: {
        border: `2px solid ${theme.palette.primary.main}`,
    },
    media: {
        height: 400,
        width: 500,
        objectFit: 'cover',
    },
}));

const SingleImageView = ({ imageSrc, descriptionItems, selected, onSelect }) => {
    const classes = useStyles();
    console.log('imageSrc', imageSrc)
    const handleImageClick = () => {
        console.log('single handleImageClick')
        if (onSelect) {
            onSelect();
        }
    };

    return (
        <Card
            onClick={handleImageClick}
            className={selected ? classes.selectedImage : classes.image}
        >
            <Grid container>
                <Grid item xs={12} container justifyContent="center" alignItems="center">
                    <CardMedia
                        component="img"
                        alt=""
                        image={imageSrc}
                        className={classes.media}
                    />
                </Grid>
                <Grid item xs={12}>
                    {descriptionItems && (
                        <CardContent>
                            <List>
                                {descriptionItems.map((item, index) => (
                                    <ListItem key={index}>
                                        <Typography variant="body1">{item}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    )}
                </Grid>
            </Grid>
        </Card>
    );
};
SingleImageView.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    descriptionItems: PropTypes.arrayOf(PropTypes.string),
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
};

// 设置默认属性值
SingleImageView.defaultProps = {
    descriptionItems: [],
    selected: false,
    onSelect: () => { },
};

export default SingleImageView;
