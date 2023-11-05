// src/hooks/useImageSelection.js
import { useState, useCallback } from 'react';

const useImageSelection = (imageCount) => {
    const [selectedIndices, setSelectedIndices] = useState(Array(imageCount).fill(false));

    const handleImageSelect = useCallback((index) => {
        const newSelectedIndices = Array(imageCount).fill(false);
        newSelectedIndices[index] = true;
        setSelectedIndices(newSelectedIndices);
    }, [imageCount]);

    return {
        selectedIndices,
        handleImageSelect,
    };
};

export default useImageSelection;
