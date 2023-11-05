// src/components/Task5View/index.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStage } from '@/store/questionSlice';
import DoubleImage from '@/components/DoubleImageView';
import useImageSelection from '@/hooks/useImageSelection';

const Task5View = ({ question }) => {
    const stage = useSelector(selectStage);
    const { selectedIndices, handleImageSelect } = useImageSelection(3);
    const [randomIndex, setRandomIndex] = useState(null);

    useEffect(() => {
        if (randomIndex === null) {
            setRandomIndex(Math.floor(Math.random() * 2));
        }
    }, [randomIndex]);
    const renderImagesForStage = () => {
        if (stage === 'Select') {
            return (
                <DoubleImage
                    key={stage}
                    images={[question.images[0], question.images[1]]}
                    descriptionItems={[question.descs[0].split(';'), question.descs[1].split(';')]}
                    selectedIndices={selectedIndices}
                    onSelect={handleImageSelect}
                />
            );
        } else {
            const selected = selectedIndices.indexOf(true);
            return (
                <DoubleImage
                    key='Prepare'
                    images={[question.images[2], question.images[selected !== -1 ? selected : randomIndex]]}
                    descriptionItems={[question.descs[2].split(';'), question.descs[selected !== -1 ? selected : randomIndex].split(';')]}
                    selectedIndices={[false, true]}
                    onSelect={() => { }}
                />
            );
        }
    };

    return (
        <div>
            {renderImagesForStage()}
        </div>
    );
};

export default Task5View;
