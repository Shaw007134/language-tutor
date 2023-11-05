// src/components/DoubleImageView.js
import React from 'react';
import { Grid } from '@material-ui/core';
import SingleImage from '../SingleImageView';
import PropTypes from 'prop-types';

const DoubleImage = ({ images, descriptionItems, selectedIndices, onSelect }) => {
    return (
        <Grid container spacing={3}>
            {images.map((image, index) => (
                <Grid item xs={6} key={index}>
                    <SingleImage
                        imageSrc={image}
                        descriptionItems={descriptionItems[index]}
                        selected={selectedIndices[index]}
                        onSelect={() => onSelect(index)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
DoubleImage.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    descriptionItems: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    selectedIndices: PropTypes.arrayOf(PropTypes.bool).isRequired,
    onSelect: PropTypes.func.isRequired,
};
export default DoubleImage;
