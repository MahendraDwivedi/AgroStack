import api from "./api";

export const askAi = async (prompt) => {
  const res = await api.post("/ai/chat", prompt, {
    headers: {
      "Content-Type": "text/plain",
    },
    timeout: 70000, // matches backend timeout
  });

  // backend returns plain text
  return res.data || "No response from AI";
};
