import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import QuestionRoutes from './questionRoutes';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} exact />
                <Route path="/questions/*" element={<QuestionRoutes />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
