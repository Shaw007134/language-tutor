// src/questions.js
import request from './request';

import { mockData } from "./mock";

export const fetchQuestions = () => {
  const questions = mockData;
  return questions;
};


export const getQuestions = (data) => {
  return request({
    url: '/speakingTasks/query',
    method: 'POST',
    data,
  });
};

export const getTaskTypes = (id) => {
  return request({
    url: '/speakingTasks/taskTypes',
    method: 'GET',
  });
};

export const getQuestion = (id) => {
  return request({
    url: `/speakingTasks/${id}`,
    method: 'GET',
  });
};

export const addQuestion = (data) => {
  return request({
    url: '/speakingTasks/create',
    method: 'POST',
    data,
  });
};

export const updateQuestion = (data) => {
  return request({
    url: '/speakingTasks/update',
    method: 'POST',
    data,
  });
};

export const deleteQuestion = (id) => {
  return request({
    url: `/speakingTasks/${id}`,
    method: 'DELETE',
  });
};

const api = {
  fetchQuestions,
  getQuestions,
  getQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getTaskTypes
};

export default api;