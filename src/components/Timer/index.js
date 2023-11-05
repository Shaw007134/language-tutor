// src/components/Timer/index.js

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextQuestion,
  setStage,
  selectStage,
  selectCurrentQuestion,
  selectCurrentQuestionIndex,
  selectQuestions,
  setIsRecording,
  setTimeRemaining,
  selectTimeRemaining,
  decrementTimeRemaining
} from '@/store/questionSlice';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  timerContainer: {
    position: 'absolute',
    width: '200px',
    height: '40px',
    right: 0,
  },
  nextStage: {
    textAlign: 'center',
    lineHeight: '24px',
    fontSize: '24px',
    color: 'red',
  },
  stage: {
    fontSize: '24px',
    textAlign: 'center',
  },
}));

const Timer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentQuestion = useSelector(selectCurrentQuestion);
  const currentQuestionIndex = useSelector(selectCurrentQuestionIndex);
  const questions = useSelector(selectQuestions);
  const timeRemaining = useSelector(selectTimeRemaining);
  const timeRemainingRef = useRef(timeRemaining);

  const stage = useSelector(selectStage);
  const [nextCountdown, setNextCountdown] = useState(5);

  useEffect(() => {
    timeRemainingRef.current = timeRemaining;
  }, [timeRemaining]);


  useEffect(() => {
    let timerId;
    if (stage === 'Select' && currentQuestion.selectionTime > 0) {
      timerId = setInterval(() => {
        dispatch(decrementTimeRemaining());
        if (timeRemainingRef.current === 0) {
          dispatch(setTimeRemaining(currentQuestion.preparationTime));
          dispatch(setStage('Prepare'));
        }
      }, 1000)
    }
    else if (stage === 'Prepare' && currentQuestion.preparationTime > 0) {
      timerId = setInterval(() => {
        // console.log('Prepare', timeRemainingRef.current)
        dispatch(decrementTimeRemaining());
        if (timeRemainingRef.current === 0) {
          console.log('go to recording')
          dispatch(setIsRecording(true));
          dispatch(setTimeRemaining(currentQuestion.recordingTime));
          dispatch(setStage('Recording'));
        }
      }, 1000);
    } else if (stage === 'Recording' && currentQuestion.recordingTime > 0) {
      timerId = setInterval(() => {
        // console.log('Recording', timeRemainingRef.current)
        dispatch(decrementTimeRemaining());
        if (timeRemainingRef.current === 0) {
          dispatch(setIsRecording(false));
          dispatch(setStage('Next'));
        }
      }, 1000);
    } else if (stage === 'Next') {
      timerId = setInterval(() => {
        setNextCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        if (nextCountdown === 0) {
          if (currentQuestionIndex < questions.length - 1) {
            dispatch(nextQuestion());
            // dispatch(resetCurrentQuestion());
            // if task type is task5, set stage to select, else to prepare
            console.log('next stage', questions[currentQuestionIndex + 1].taskType)
            dispatch(setStage(questions[currentQuestionIndex + 1].taskType === 5 ? 'Select' : 'Prepare'));
            setNextCountdown(5);
          } else {
            navigate('/');
          }
        }
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [stage, currentQuestionIndex, currentQuestion, questions, dispatch, navigate, nextCountdown
  ]);

  return (
    <div className={classes.timerContainer}>
      {stage === 'Next' ? (
        <div className={classes.nextStage}>
          Next in: {nextCountdown}
        </div>
      ) : (
        <div>
            <div className={classes.stage}>
              {stage}  {" "}  {timeRemaining}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
