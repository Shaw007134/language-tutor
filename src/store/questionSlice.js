// src/store/questionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockData } from '@/api/mock';

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    isRecording: false,
    timeRemaining: 30,
    stage: 'Prepare',
}

export const fetchQuestions = createAsyncThunk(
    'question/fetchQuestions',
    async () => {
        // const response = await api.get('/mock-api/questions');
        // console.log('fetchQuestions', response.data)
        // return response.data;
        const response = await new Promise(resolve => {
            setTimeout(() => {
                resolve(mockData);
            }, 1000);
        });
        console.log('fetchQuestions', response);
        return response;
    }
);

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        initializeState: (state, action) => {
            const { preparationTime, stage } = action.payload;
            state.timeRemaining = preparationTime;
            state.stage = stage;
            console.log('initializeState', preparationTime, stage)
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
            state.currentQuestionIndex = 0;
            state.isRecording = false;
            state.timeRemaining = state.questions.length > 0 ? state.questions[0].preparationTime : 0;
            state.stage = state.questions.length > 0 && state.questions[0].taskType === '5' ? 'Select' : 'Prepare';
        },
        nextQuestion(state) {
            const nextIndex = state.currentQuestionIndex + 1;
            if (nextIndex < state.questions.length) {
                state.currentQuestionIndex = nextIndex;
                state.isRecording = false;
                state.timeRemaining = state.questions[nextIndex].preparationTime;
            }
        },
        previousQuestion(state) {
            const prevIndex = state.currentQuestionIndex - 1;
            if (prevIndex >= 0) {
                state.currentQuestionIndex = prevIndex;
                state.isRecording = false;
                state.timeRemaining = state.questions[prevIndex].preparationTime;
            }
        },
        decrementTimeRemaining: (state) => {
            state.timeRemaining = state.timeRemaining > 0 ? state.timeRemaining - 1 : 0;
        },
        setIsRecording: (state, action) => {
            state.isRecording = action.payload;
        },
        setTimeRemaining: (state, action) => {
            state.timeRemaining = action.payload;
        },
        setStage: (state, action) => {
            state.stage = action.payload;
        },
        reset(state) {
            state.currentQuestionIndex = 0;
            state.isRecording = false;
            state.timeRemaining = state.questions.length > 0 ? state.questions[0].preparationTime : 0;
        },
        resetCurrentQuestion(state) {
            state.isRecording = false;
            state.timeRemaining = state.questions.length > 0 ? state.questions[state.currentQuestionIndex].preparationTime : 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
        });
        builder.addCase(fetchQuestions.rejected, (state, action) => {
            console.error('fetchQuestions failed:', action.error);
        });
    },
});

export const {
    initializeState,
    setQuestions,
    nextQuestion,
    previousQuestion,
    setIsRecording,
    decrementTimeRemaining,
    setTimeRemaining,
    reset,
    setStage,
    resetCurrentQuestion,
} = questionSlice.actions;

export const selectQuestions = (state) => state.question.questions;
export const selectCurrentQuestion = (state) => {
    if (state.question.currentQuestionIndex >= 0 && state.question.currentQuestionIndex < state.question.questions.length) {
        return state.question.questions[state.question.currentQuestionIndex];
    }
    return null;
};
export const selectCurrentQuestionIndex = state => state.question.currentQuestionIndex;
export const selectTimeRemaining = (state) => state.question.timeRemaining;
export const selectStage = state => state.question.stage;

export default questionSlice.reducer;
