import api from "./api";

export const fetchAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data.data;
};

export const banUser = async (id) => {
  return api.put(`/admin/users/${id}/ban`);
};

export const unbanUser = async (id) => {
  return api.put(`/admin/users/${id}/unban`);
};

export const promoteUser = async (id) => {
  return api.put(`/admin/users/${id}/promote`);
};

export const deleteQuestionAdmin = async (id) => {
  return api.delete(`/admin/questions/${id}`);
};

export const deleteAnswerAdmin = async (id) => {
  return api.delete(`/admin/answers/${id}`);
};
