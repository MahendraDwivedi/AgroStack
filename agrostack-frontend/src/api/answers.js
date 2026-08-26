
import api from "./api";

// 🔹 GET ANSWERS (PAGINATED)
export const fetchAnswersByQuestion = async (
  questionId,
  page = 0,
  size = 5
) => {
  const res = await api.get(
    `/answers/question/${questionId}`,
    { params: { page, size } }
  );

  // ApiResponse<Page<AnswerResponse>>
  return res.data.data;
};

// 🔹 ADD ANSWER
export const addAnswer = async ({ questionId, content }) => {
  const res = await api.post("/answers", { questionId, content });
  console.log(res.data);
  
  return res.data;
};

// 🔹 VOTE ANSWER
export const voteAnswer = async (answerId, type) => {
  const res = await api.post(
    `/answers/${answerId}/vote`,
    null,
    { params: { type } }
  );
  return res.data;
};

export const acceptAnswer = async (questionId, answerId) => {
  const res = await api.put(
    `/answers/${questionId}/accept/${answerId}`
  );
  return res.data;
};

export const updateAnswer = async (answerId, content) => {
  const res = await api.put(
    `/answers/${answerId}`,
    null,
    { params: { content } }
  );
  return res.data;
};

// 🔹 DELETE ANSWER
export const deleteAnswer = async (answerId) => {
  const res = await api.delete(`/answers/${answerId}`);
  return res.data;
};

