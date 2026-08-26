import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { askQuestion } from "../api/questions";
import toast from "react-hot-toast";
import "../styles/ask-question.css";

export default function AskQuestion() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const mutation = useMutation({
    mutationFn: () => askQuestion(form),
    onSuccess: () => {
      // ✅ Clear all inputs
      setForm({
        title: "",
        description: "",
        category: "",
      });

      toast.success("Question posted successfully!");
    },
    onError: () => {
      toast.error("Failed to post question");
    },
  });

  const handleSubmit = () => {
    // 🚫 Frontend validation
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.category.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    mutation.mutate();
  };

  return (
    <div className="ask-question-container">
      <h2>Ask Question</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
