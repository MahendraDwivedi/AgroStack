// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addAnswer } from "../api/answers";
// import "../styles/answer-form.css";

// export default function AnswerForm({ questionId }) {
//   const [content, setContent] = useState("");
//   const qc = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: () => addAnswer({ questionId, content }),
//     onSuccess: () => {
//       setContent("");
//       qc.invalidateQueries(["answers", questionId]);
//     },
//   });

//   if (!localStorage.getItem("token")) return null;

//   return (
//     <div className="answer-form-container">
//       <h4>Your Answer</h4>
//       <textarea
//         rows={5}
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button onClick={() => mutation.mutate()}>
//         Post Answer
//       </button>
//     </div>
//   );
// }


import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { addAnswer } from "../api/answers";
import "../styles/answer-form.css";

export default function AnswerForm({ questionId }) {
  const qc = useQueryClient();
  const [hasContent, setHasContent] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      // Enable button only when text exists
      setHasContent(editor.getText().trim().length > 0);
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor",
        spellcheck: "true",
      },
    },
  });

  const mutation = useMutation({
    mutationFn: () =>
      addAnswer({
        questionId,
        content: editor.getHTML(), // ✅ store HTML
      }),
    onSuccess: () => {
      editor.commands.clearContent();
      setHasContent(false);
      qc.invalidateQueries(["answers", questionId]);
    },
  });

  // 🔐 hide editor if not logged in
  if (!localStorage.getItem("token")) return null;

  return (
    <div className="answer-form-container">
      <h4>Your Answer</h4>

      {/* 🔹 TOOLBAR */}
      {editor && (
        <div className="editor-toolbar">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <b>B</b>
          </button>

          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <i>I</i>
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </button>

          <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
            • List
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            1. List
          </button>

          <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            {"</>"}
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            ❝ ❞
          </button>
        </div>
      )}

      {/* 🔹 EDITOR */}
      {editor && <EditorContent editor={editor} />}

      {/* 🔹 SUBMIT */}
      <button
        className="post-answer-btn"
        disabled={mutation.isPending || !hasContent}
        onClick={() => mutation.mutate()}
      >
        {mutation.isPending ? "Posting..." : "Post Answer"}
      </button>
    </div>
  );
}
