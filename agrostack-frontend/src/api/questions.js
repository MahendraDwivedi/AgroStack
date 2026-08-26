import api from "./api";

export const fetchQuestions = async (page , size ) => {
  const res = await api.get(`/questions?page=${page}&size=${size}`);
  return res.data.data;
};

export const fetchQuestionById = async (id) => {
  const res = await api.get(`/questions/${id}`);
  return res.data.data;
};

export const askQuestion = async (data) => {
  const res = await api.post("/questions", data);
  return res.data;
};

export const deleteQuestion = async (id) => {
  const res = await api.delete(`/questions/${id}`);
  return res.data;
};
