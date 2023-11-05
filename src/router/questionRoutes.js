import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuestionView from '@/views/QuestionView';
import QuestionMgmt from '@/views/QuestionMgmt';

const QuestionRoutes = () => {
    return (
        <Routes>
            <Route path="/speaking-test/" element={<QuestionView />} />
            <Route path="/management/" element={<QuestionMgmt />} />

        </Routes>
    );
};

export default QuestionRoutes;
