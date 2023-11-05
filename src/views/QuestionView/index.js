// src/views/QuestionView.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchQuestions, selectCurrentQuestion, initializeState } from '@/store/questionSlice';
import Timer from '@/components/Timer';
import TextContent from '@/components/TextContent';
import SingleImageView from '@/components/SingleImageView';
import Task5View from './components/Task5View';
import Recorder from '@/components/Recorder';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));

const QuestionView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const currentQuestion = useSelector(selectCurrentQuestion);
    const isRecording = useSelector(state => state.question.isRecording);

    useEffect(() => {
        dispatch(fetchQuestions()).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentQuestion) {
            dispatch(initializeState({
                preparationTime: currentQuestion.preparationTime,
                stage: currentQuestion.taskType === 5 ? 'Select' : 'Prepare'
            }));
        }
    }, [dispatch, currentQuestion]);

    useEffect(() => {
        // Request microphone access
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                console.log('Microphone access granted');
            })
            .catch(error => {
                console.error('Microphone access denied:', error);
            });
    }, []);

    if (!isLoaded) {
        return null;
    }
    const recordingTime = currentQuestion.recordingTime || 0;  // 确保有一个默认值，避免undefined

    const renderQuestionContent = () => {
        switch (currentQuestion.taskType) {
            case 3:
            case 4:
            case 8:
                return <SingleImageView imageSrc={currentQuestion.image} />;
            case 5:
                return <Task5View question={currentQuestion} />;
            default:
                return null;
        }
    };

    return (
        <Container className={classes.container}>
            <Box my={2}>
                <Timer />
            </Box>
            <Box my={2}>
                <TextContent title={currentQuestion.title} content={currentQuestion.content} />
            </Box>
            <Box my={2}>
                {renderQuestionContent()}
            </Box>
            {isRecording && (
                <Recorder isRecording={isRecording} recordingTime={recordingTime} title={currentQuestion.title} />
            )}
        </Container>
    );
};

export default QuestionView;
