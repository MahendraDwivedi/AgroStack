import api from "./api";

export const fetchMyQuestions = async (page, size) => {
  const res = await api.get(`/users/me/questions?page=${page}&size=${size}`);
  return res.data.data;
};

export const fetchMyAnswers = async (page, size) => {
  const res = await api.get(`/users/me/answers?page=${page}&size=${size}`);
  return res.data.data;
};
