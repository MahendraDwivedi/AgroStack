// // import { useParams } from "react-router-dom";
// // import { useEffect, useMemo, useState } from "react";
// // import { useQuery, useQueryClient } from "@tanstack/react-query";
// // import toast from "react-hot-toast";

// // import { fetchQuestionById } from "../api/questions";
// // import {
// //   fetchAnswersByQuestion,
// //   acceptAnswer,
// //   deleteAnswer,
// //   updateAnswer,
// // } from "../api/answers";

// // import VoteButtons from "../components/VoteButtons";
// // import AnswerForm from "../components/AnswerForm";
// // import "../styles/question.css";

// // export default function QuestionDetails() {
// //   const { id } = useParams();
// //   const queryClient = useQueryClient();

// //   const [page, setPage] = useState(0);
// //   const [editingId, setEditingId] = useState(null);
// //   const [editContent, setEditContent] = useState("");

// //   // 🚫 SAFETY
// //   if (!id) return <p>Loading question...</p>;

// //   // 🔹 QUESTION
// //   const {
// //     data: question,
// //     isLoading: questionLoading,
// //     isError,
// //   } = useQuery({
// //     queryKey: ["question", id],
// //     queryFn: () => fetchQuestionById(id),
// //     enabled: !!id,
// //   });

// //   // 🔹 ANSWERS
// //   const {
// //     data: answers = {
// //       content: [],
// //       totalElements: 0,
// //       totalPages: 0,
// //     },
// //     isLoading,
// //   } = useQuery({
// //     queryKey: ["answers", id, page],
// //     queryFn: () => fetchAnswersByQuestion(id, page),
// //     enabled: !!id,
// //     keepPreviousData: true,
// //     refetchOnWindowFocus: false,
// //   });

// //   // 🔁 Reset page when question changes
// //   useEffect(() => {
// //     setPage(0);
// //   }, [id]);

// //   // 🔥 Accepted answer pinned at top
// //   const orderedAnswers = useMemo(() => {
// //     return [...answers.content].sort(
// //       (a, b) => Number(b.accepted) - Number(a.accepted)
// //     );
// //   }, [answers.content]);

// //   console.log(orderedAnswers);

// //   // ✅ ACCEPT ANSWER
// //   const handleAccept = async (answerId) => {
// //     try {
// //       await acceptAnswer(id, answerId);
// //       toast.success("Answer accepted");
// //       queryClient.invalidateQueries(["answers", id]);
// //       queryClient.invalidateQueries(["question", id]);
// //     } catch {
// //       toast.error("Only question owner can accept answers");
// //     }
// //   };

// //   // 🗑 DELETE ANSWER
// //   const handleDelete = async (answerId) => {
// //     if (!window.confirm("Delete this answer?")) return;

// //     await deleteAnswer(answerId);
// //     toast.success("Answer deleted");
// //     queryClient.invalidateQueries(["answers", id]);
// //   };

// //   // ✏ UPDATE ANSWER
// //   const handleUpdate = async (answerId) => {
// //     if (!editContent.trim()) {
// //       toast.error("Answer cannot be empty");
// //       return;
// //     }

// //     await updateAnswer(answerId, editContent);
// //     toast.success("Answer updated");
// //     setEditingId(null);
// //     setEditContent("");
// //     queryClient.invalidateQueries(["answers", id]);
// //   };

// //   const role = localStorage.getItem("role");
// //   console.log(orderedAnswers);

// //   // ⛔ STATES
// //   if (questionLoading) return <p>Loading question...</p>;
// //   if (isError) return <p>Question not found</p>;

// //   return (
// //     <div style={{ maxWidth: 900, margin: "auto", padding: "2rem" }}>
// //       <h2 className="question-title">{question.title}</h2>
// //       <p className="question-description">{question.description}</p>
// //       <h3 className="answers-title">{answers.totalElements} Answers</h3>

// //       {isLoading && <p>Loading answers...</p>}

// //       {!isLoading && orderedAnswers.length === 0 && <p>No answers yet.</p>}

// //       {orderedAnswers.map((a) => (
// //         <div
// //           key={a.id}
// //           className={`answer-row ${a.accepted ? "accepted-answer" : ""}`}
// //         >
// //           <VoteButtons answer={a} />

// //           <div className="answer-content">
// //             {a.accepted && (
// //               <div className="accepted-badge">✔ Accepted Answer</div>
// //             )}
// //             {a.expert && <span className="expert-badge">⭐ Expert</span>}
// //             {editingId === a.id ? (
// //               <>
// //                 <textarea
// //                   value={editContent}
// //                   onChange={(e) => setEditContent(e.target.value)}
// //                 />
// //                 <button onClick={() => handleUpdate(a.id)}>Save</button>
// //                 <button
// //                   onClick={() => {
// //                     setEditingId(null);
// //                     setEditContent("");
// //                   }}
// //                 >
// //                   Cancel
// //                 </button>
// //               </>
// //             ) : (
// //               <p>{a.content}</p>
// //             )}

// //             <small>by {a.username}</small>

// //             <div className="answer-actions">
// //               {/* ✅ Accept */}
// //               {question.owner && !a.accepted && (
// //                 <button onClick={() => handleAccept(a.id)}>Accept</button>
// //               )}

// //               {/* ✏ Edit / 🗑 Delete */}
// //               {(a.owner || role === "ADMIN") && (
// //                 <>
// //                   {!a.accepted && (
// //                     <button
// //                       onClick={() => {
// //                         setEditingId(a.id);
// //                         setEditContent(a.content);
// //                       }}
// //                     >
// //                       Edit
// //                     </button>
// //                   )}
// //                   <button onClick={() => handleDelete(a.id)}>Delete</button>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       ))}

// //       {/* 🔹 PAGINATION */}
// //       <div className="pagination">
// //         <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
// //           Prev
// //         </button>

// //         <span>Page {page + 1}</span>

// //         <button
// //           disabled={page + 1 >= answers.totalPages}
// //           onClick={() => setPage((p) => p + 1)}
// //         >
// //           Next
// //         </button>
// //       </div>

// //       <AnswerForm questionId={id} />
// //     </div>
// //   );
// // }



// import { useParams } from "react-router-dom";
// import { useEffect, useMemo, useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// import { fetchQuestionById } from "../api/questions";
// import {
//   fetchAnswersByQuestion,
//   acceptAnswer,
//   deleteAnswer,
//   updateAnswer,
// } from "../api/answers";

// import VoteButtons from "../components/VoteButtons";
// import AnswerForm from "../components/AnswerForm";
// import "../styles/question.css";

// export default function QuestionDetails() {
//   const { id } = useParams();
//   const queryClient = useQueryClient();

//   const [page, setPage] = useState(0);
//   const [editingId, setEditingId] = useState(null);
//   const [editContent, setEditContent] = useState("");

//   const role = localStorage.getItem("role");

//   if (!id) return <p>Loading question...</p>;

//   // 🔹 QUESTION
//   const {
//     data: question,
//     isLoading: questionLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["question", id],
//     queryFn: () => fetchQuestionById(id),
//     enabled: !!id,
//   });

//   // 🔹 ANSWERS
//   const {
//     data: answers = { content: [], totalElements: 0, totalPages: 0 },
//     isLoading,
//   } = useQuery({
//     queryKey: ["answers", id, page],
//     queryFn: () => fetchAnswersByQuestion(id, page),
//     enabled: !!id,
//     keepPreviousData: true,
//   });

//   useEffect(() => {
//     setPage(0);
//   }, [id]);

//   // 🔥 Accepted answer on top
//   const orderedAnswers = useMemo(() => {
//     return [...answers.content].sort(
//       (a, b) => Number(b.accepted) - Number(a.accepted)
//     );
//   }, [answers.content]);

//   // ✅ ACCEPT ANSWER
//   const handleAccept = async (answerId) => {
//     try {
//       await acceptAnswer(id, answerId);
//       toast.success("Answer accepted");
//       queryClient.invalidateQueries(["answers", id]);
//       queryClient.invalidateQueries(["question", id]);
//     } catch {
//       toast.error("Only question owner can accept answers");
//     }
//   };

//   // 🗑 DELETE ANSWER
//   const handleDelete = async (answerId) => {
//     if (!window.confirm("Delete this answer?")) return;
//     await deleteAnswer(answerId);
//     toast.success("Answer deleted");
//     queryClient.invalidateQueries(["answers", id]);
//   };

//   // ✏ UPDATE ANSWER
//   const handleUpdate = async (answerId) => {
//     if (!editContent.trim()) {
//       toast.error("Answer cannot be empty");
//       return;
//     }
//     await updateAnswer(answerId, editContent);
//     toast.success("Answer updated");
//     setEditingId(null);
//     setEditContent("");
//     queryClient.invalidateQueries(["answers", id]);
//   };

//   if (questionLoading) return <p>Loading question...</p>;
//   if (isError) return <p>Question not found</p>;

//   return (
//     <div className="question-page">
//       <h2 className="question-title">{question.title}</h2>
//       <p className="question-description">{question.description}</p>

//       <h3 className="answers-title">{answers.totalElements} Answers</h3>

//       {isLoading && <p>Loading answers...</p>}
//       {!isLoading && orderedAnswers.length === 0 && <p>No answers yet.</p>}

//       {orderedAnswers.map((a) => (
//         <div
//           key={a.id}
//           className={`answer-row ${a.accepted ? "accepted-answer" : ""}`}
//         >
//           <VoteButtons answer={a} />

//           <div className="answer-content">
//             {/* 🏷️ BADGES */}
//             <div className="badge-row">
//               {a.accepted && (
//                 <span className="accepted-badge">✔ Accepted</span>
//               )}
//               {a.expert && <span className="expert-badge">⭐ Expert's Answer</span>}
//             </div>

//             {editingId === a.id ? (
//               <>
//                 <textarea
//                   value={editContent}
//                   onChange={(e) => setEditContent(e.target.value)}
//                 />
//                 <div className="answer-actions">
//                   <button onClick={() => handleUpdate(a.id)}>Save</button>
//                   <button
//                     onClick={() => {
//                       setEditingId(null);
//                       setEditContent("");
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <p>{a.content}</p>
//             )}

//             <small>by {a.username}</small>

//             <div className="answer-actions">
//               {/* ✅ Accept */}
//               {question.owner && !a.accepted && (
//                 <button onClick={() => handleAccept(a.id)}>Accept</button>
//               )}

//               {/* ✏ / 🗑 */}
//               { (
//                 <>
//                   {( a.owner && !a.accepted) && (
//                     <button
//                       onClick={() => {
//                         setEditingId(a.id);
//                         setEditContent(a.content);
//                       }}
//                     >
//                       Edit
//                     </button>
//                   )}
//                    {a.owner || role === "ADMIN" &&<button onClick={() => handleDelete(a.id)}>Delete</button>}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* 🔹 PAGINATION */}
//       <div className="pagination">
//         <button disabled={page === 0} onClick={() => setPage(page - 1)}>
//           Prev
//         </button>
//         <span>Page {page + 1}</span>
//         <button
//           disabled={page + 1 >= answers.totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>

//       <AnswerForm questionId={id} />
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { fetchQuestionById } from "../api/questions";
import {
  fetchAnswersByQuestion,
  acceptAnswer,
  deleteAnswer,
  updateAnswer,
} from "../api/answers";

import VoteButtons from "../components/VoteButtons";
import AnswerForm from "../components/AnswerForm";
import "../styles/question.css";

export default function QuestionDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editHTML, setEditHTML] = useState("");

  const role = localStorage.getItem("role");

  if (!id) return <p>Loading question...</p>;

  /* ---------------- QUESTION ---------------- */
  const {
    data: question,
    isLoading: questionLoading,
    isError,
  } = useQuery({
    queryKey: ["question", id],
    queryFn: () => fetchQuestionById(id),
    enabled: !!id,
  });

  /* ---------------- ANSWERS ---------------- */
  const {
    data: answers = { content: [], totalElements: 0, totalPages: 0 },
    isLoading,
  } = useQuery({
    queryKey: ["answers", id, page],
    queryFn: () => fetchAnswersByQuestion(id, page),
    enabled: !!id,
    keepPreviousData: true,
  });

  useEffect(() => {
    setPage(0);
  }, [id]);

  /* ---------------- SORT ANSWERS ---------------- */
  const orderedAnswers = useMemo(() => {
    return [...answers.content].sort(
      (a, b) => Number(b.accepted) - Number(a.accepted)
    );
  }, [answers.content]);

  /* ---------------- EDITOR (EDIT MODE) ---------------- */
  const editEditor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  // ✅ IMPORTANT: sync HTML into editor AFTER clicking Edit
  useEffect(() => {
    if (editEditor && editHTML) {
      editEditor.commands.setContent(editHTML);
    }
  }, [editEditor, editHTML]);

  /* ---------------- ACTIONS ---------------- */

  const handleAccept = async (answerId) => {
    try {
      await acceptAnswer(id, answerId);
      toast.success("Answer accepted");
      queryClient.invalidateQueries(["answers", id]);
      queryClient.invalidateQueries(["question", id]);
    } catch {
      toast.error("Only question owner can accept answers");
    }
  };

  const handleDelete = async (answerId) => {
    if (!window.confirm("Delete this answer?")) return;
    await deleteAnswer(answerId);
    toast.success("Answer deleted");
    queryClient.invalidateQueries(["answers", id]);
  };

  const handleUpdate = async (answerId) => {
    const html = editEditor?.getHTML();
    const text = editEditor?.getText().trim();

    if (!text) {
      toast.error("Answer cannot be empty");
      return;
    }

    await updateAnswer(answerId, html);
    toast.success("Answer updated");

    setEditingId(null);
    setEditHTML("");
    editEditor.commands.clearContent();
    queryClient.invalidateQueries(["answers", id]);
  };

  if (questionLoading) return <p>Loading question...</p>;
  if (isError) return <p>Question not found</p>;

  return (
    <div className="question-page">
      <h2 className="question-title">{question.title}</h2>
      <p className="question-description">{question.description}</p>

      <h3 className="answers-title">{answers.totalElements} Answers</h3>

      {isLoading && <p>Loading answers...</p>}
      {!isLoading && orderedAnswers.length === 0 && <p>No answers yet.</p>}

      {orderedAnswers.map((a) => (
        <div
          key={a.id}
          className={`answer-row ${a.accepted ? "accepted-answer" : ""}`}
        >
          <VoteButtons answer={a} />

          <div className="answer-content">
            {/* BADGES */}
            <div className="badge-row">
              {a.accepted && <span className="accepted-badge">✔ Accepted</span>}
              {a.expert && (
                <span className="expert-badge">⭐ Expert's Answer</span>
              )}
            </div>

            {/* EDIT MODE */}
            {editingId === a.id ? (
              <>
                {editEditor && <EditorContent editor={editEditor} />}

                <div className="answer-actions">
                  <button onClick={() => handleUpdate(a.id)}>Save</button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditHTML("");
                      editEditor.commands.clearContent();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              /* DISPLAY MODE */
              <div
                className="answer-html"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(a.content),
                }}
              />
            )}

            <small>by {a.username}</small>

            <div className="answer-actions">
              {question.owner && !a.accepted && (
                <button onClick={() => handleAccept(a.id)}>Accept</button>
              )}

              {a.owner && !a.accepted && (
                <button
                  onClick={() => {
                    setEditingId(a.id);
                    setEditHTML(a.content); // ✅ HTML preserved
                  }}
                >
                  Edit
                </button>
              )}

              {(a.owner || role === "ADMIN") && (
                <button onClick={() => handleDelete(a.id)}>Delete</button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>Page {page + 1}</span>
        <button
          disabled={page + 1 >= answers.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <AnswerForm questionId={id} />
    </div>
  );
}
