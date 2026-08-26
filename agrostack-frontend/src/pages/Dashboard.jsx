// import { useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import DOMPurify from "dompurify";

// import { fetchMyQuestions, fetchMyAnswers } from "../api/dashboard";
// import { deleteAnswer } from "../api/answers";
// import { deleteQuestion } from "../api/questions";

// import StatCard from "../components/dashboard/StatCard";
// import DashboardCard from "../components/dashboard/DashboardCard";
// import DashboardSection from "../components/dashboard/DashboardSection";

// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const qc = useQueryClient();

//   const [qPage, setQPage] = useState(0);
//   const [aPage, setAPage] = useState(0);

//   // 🔹 MY QUESTIONS
//   const { data: questions = { content: [], totalElements: 0, totalPages: 0 } } =
//     useQuery({
//       queryKey: ["myQuestions", qPage],
//       queryFn: () => fetchMyQuestions(qPage, 5),
//       keepPreviousData: true,
//     });

//   // 🔹 MY ANSWERS
//   const { data: answers = { content: [], totalElements: 0, totalPages: 0 } } =
//     useQuery({
//       queryKey: ["myAnswers", aPage],
//       queryFn: () => fetchMyAnswers(aPage, 5),
//       keepPreviousData: true,
//     });

//   // 🗑️ DELETE ANSWER
//   const handleDeleteAnswer = async (id) => {
//     if (!confirm("Delete this answer?")) return;
//     await deleteAnswer(id);
//     toast.success("Answer deleted");
//     qc.invalidateQueries(["myAnswers"]);
//   };

//   // 🗑️ DELETE QUESTION
//   const handleDeleteQuestion = async (id) => {
//     if (!confirm("Delete this question and all its answers?")) return;
//     await deleteQuestion(id);
//     toast.success("Question deleted");
//     qc.invalidateQueries(["myQuestions"]);
//   };

//   return (
//     <div className="dashboard">
//       <h2>My Dashboard</h2>

//       {/* 🔹 STATS */}
//       <div className="dashboard-stats">
//         <StatCard title="My Questions" value={questions.totalElements} />
//         <StatCard title="My Answers" value={answers.totalElements} />
//       </div>

//       {/* 🔹 MY QUESTIONS */}
//       <DashboardSection title="My Questions">
//         {questions.content.length === 0 && (
//           <p className="empty">You haven’t asked any questions yet.</p>
//         )}

//         {questions.content.map((q) => (
//           <DashboardCard key={q.id}>
//             <Link to={`/questions/${q.id}`} className="card-title">
//               {q.title}
//             </Link>

//             <div className="card-actions">
//               <Link to={`/questions/${q.id}`} className="btn">
//                 View
//               </Link>
//               <button
//                 className="btn danger"
//                 onClick={() => handleDeleteQuestion(q.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </DashboardCard>
//         ))}

//         {/* Pagination */}
//         <div className="pagination">
//           <button disabled={qPage === 0} onClick={() => setQPage(qPage - 1)}>
//             Prev
//           </button>
//           <span>Page {qPage + 1}</span>
//           <button
//             disabled={qPage + 1 >= questions.totalPages}
//             onClick={() => setQPage(qPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </DashboardSection>

//       {/* 🔹 MY ANSWERS */}
//       <DashboardSection title="My Answers">
//         {answers.content.length === 0 && (
//           <p className="empty">You haven’t answered any questions yet.</p>
//         )}

//         {answers.content.map((a) => (
//           <DashboardCard key={a.id}>
//             {/* ✅ FIXED: Render sanitized HTML preview */}
//             <div
//               className="answer-preview"
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(a.content),
//               }}
//             />

//             <div className="meta">
//               {a.accepted && <span className="accepted">✔ Accepted</span>}
//             </div>

//             <div className="card-actions">
//               <button
//                 className="btn danger"
//                 onClick={() => handleDeleteAnswer(a.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </DashboardCard>
//         ))}

//         {/* Pagination */}
//         <div className="pagination">
//           <button disabled={aPage === 0} onClick={() => setAPage(aPage - 1)}>
//             Prev
//           </button>
//           <span>Page {aPage + 1}</span>
//           <button
//             disabled={aPage + 1 >= answers.totalPages}
//             onClick={() => setAPage(aPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </DashboardSection>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import DOMPurify from "dompurify";

// import { fetchMyQuestions, fetchMyAnswers } from "../api/dashboard";
// import { deleteAnswer } from "../api/answers";
// import { deleteQuestion } from "../api/questions";

// import StatCard from "../components/dashboard/StatCard";
// import DashboardCard from "../components/dashboard/DashboardCard";
// import DashboardSection from "../components/dashboard/DashboardSection";

// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const qc = useQueryClient();

//   const [qPage, setQPage] = useState(0);
//   const [aPage, setAPage] = useState(0);

//   // 🔹 MY QUESTIONS
//   const { data: questions = { content: [], totalElements: 0, totalPages: 0 } } =
//     useQuery({
//       queryKey: ["myQuestions", qPage],
//       queryFn: () => fetchMyQuestions(qPage, 5),
//       keepPreviousData: true,
//     });

//   // 🔹 MY ANSWERS
//   const { data: answers = { content: [], totalElements: 0, totalPages: 0 } } =
//     useQuery({
//       queryKey: ["myAnswers", aPage],
//       queryFn: () => fetchMyAnswers(aPage, 5),
//       keepPreviousData: true,
//     });

//   // 🗑️ DELETE ANSWER
//   const handleDeleteAnswer = async (id) => {
//     if (!confirm("Delete this answer?")) return;
//     await deleteAnswer(id);
//     toast.success("Answer deleted");
//     qc.invalidateQueries(["myAnswers"]);
//   };

//   // 🗑️ DELETE QUESTION
//   const handleDeleteQuestion = async (id) => {
//     if (!confirm("Delete this question and all its answers?")) return;
//     await deleteQuestion(id);
//     toast.success("Question deleted");
//     qc.invalidateQueries(["myQuestions"]);
//   };
//   console.log(answers);
  

//   return (
//     <div className="dashboard">
//       <h2>My Dashboard</h2>

//       {/* 🔹 STATS */}
//       <div className="dashboard-stats">
//         <StatCard title="My Questions" value={questions.totalElements} />
//         <StatCard title="My Answers" value={answers.totalElements} />
//       </div>

//       {/* 🔹 MY QUESTIONS */}
//       <DashboardSection title="My Questions">
//         {questions.content.length === 0 && (
//           <p className="empty">You haven’t asked any questions yet.</p>
//         )}

//         {questions.content.map((q) => (
//           <DashboardCard key={q.id}>
//             <Link to={`/questions/${q.id}`} className="card-title">
//               {q.title}
//             </Link>

//             <div className="card-actions">
//               <Link to={`/questions/${q.id}`} className="btn">
//                 View
//               </Link>
//               <button
//                 className="btn danger"
//                 onClick={() => handleDeleteQuestion(q.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </DashboardCard>
//         ))}

//         {/* Pagination */}
//         <div className="pagination">
//           <button disabled={qPage === 0} onClick={() => setQPage(qPage - 1)}>
//             Prev
//           </button>
//           <span>Page {qPage + 1}</span>
//           <button
//             disabled={qPage + 1 >= questions.totalPages}
//             onClick={() => setQPage(qPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </DashboardSection>

//       {/* 🔹 MY ANSWERS */}
//       <DashboardSection title="My Answers">
//         {answers.content.length === 0 && (
//           <p className="empty">You haven’t answered any questions yet.</p>
//         )}

//         {answers.content.map((a) => (
//           <DashboardCard key={a.id}>
//             {/* ✅ Rich-text preview (sanitized HTML) */}
//             <div
//               className="answer-preview"
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(a.content),
//               }}
//             />

//             {/* Read full answer */}
//             <Link to={`/questions/${a.questionId}`} className="read-more">
//               Read full answer →
//             </Link>

//             <div className="meta">
//               {a.accepted && <span className="accepted">✔ Accepted</span>}
//             </div>

//             <div className="card-actions">
//               <button
//                 className="btn danger"
//                 onClick={() => handleDeleteAnswer(a.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </DashboardCard>
//         ))}

//         {/* Pagination */}
//         <div className="pagination">
//           <button disabled={aPage === 0} onClick={() => setAPage(aPage - 1)}>
//             Prev
//           </button>
//           <span>Page {aPage + 1}</span>
//           <button
//             disabled={aPage + 1 >= answers.totalPages}
//             onClick={() => setAPage(aPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </DashboardSection>
//     </div>
//   );
// }


import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

import { fetchMyQuestions, fetchMyAnswers } from "../api/dashboard";
import { deleteAnswer } from "../api/answers";
import { deleteQuestion } from "../api/questions";

import StatCard from "../components/dashboard/StatCard";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardSection from "../components/dashboard/DashboardSection";

import "../styles/dashboard.css";

export default function Dashboard() {
  const qc = useQueryClient();

  const [qPage, setQPage] = useState(0);
  const [aPage, setAPage] = useState(0);

  // ✅ Modal state
  const [openAnswer, setOpenAnswer] = useState(null);

  // 🔹 MY QUESTIONS
  const { data: questions = { content: [], totalElements: 0, totalPages: 0 } } =
    useQuery({
      queryKey: ["myQuestions", qPage],
      queryFn: () => fetchMyQuestions(qPage, 5),
      keepPreviousData: true,
    });

  // 🔹 MY ANSWERS
  const { data: answers = { content: [], totalElements: 0, totalPages: 0 } } =
    useQuery({
      queryKey: ["myAnswers", aPage],
      queryFn: () => fetchMyAnswers(aPage, 5),
      keepPreviousData: true,
    });

  // 🗑️ DELETE ANSWER
  const handleDeleteAnswer = async (id) => {
    if (!confirm("Delete this answer?")) return;
    await deleteAnswer(id);
    toast.success("Answer deleted");
    qc.invalidateQueries(["myAnswers"]);
  };

  // 🗑️ DELETE QUESTION
  const handleDeleteQuestion = async (id) => {
    if (!confirm("Delete this question and all its answers?")) return;
    await deleteQuestion(id);
    toast.success("Question deleted");
    qc.invalidateQueries(["myQuestions"]);
  };

  return (
    <div className="dashboard">
      <h2>My Dashboard</h2>

      {/* 🔹 STATS */}
      <div className="dashboard-stats">
        <StatCard title="My Questions" value={questions.totalElements} />
        <StatCard title="My Answers" value={answers.totalElements} />
      </div>

      {/* 🔹 MY QUESTIONS */}
      <DashboardSection title="My Questions">
        {questions.content.length === 0 && (
          <p className="empty">You haven’t asked any questions yet.</p>
        )}

        {questions.content.map((q) => (
          <DashboardCard key={q.id}>
            <Link to={`/questions/${q.id}`} className="card-title">
              {q.title}
            </Link>

            <div className="card-actions">
              <Link to={`/questions/${q.id}`} className="btn">
                View
              </Link>
              <button
                className="btn danger"
                onClick={() => handleDeleteQuestion(q.id)}
              >
                Delete
              </button>
            </div>
          </DashboardCard>
        ))}

        <div className="pagination">
          <button disabled={qPage === 0} onClick={() => setQPage(qPage - 1)}>
            Prev
          </button>
          <span>Page {qPage + 1}</span>
          <button
            disabled={qPage + 1 >= questions.totalPages}
            onClick={() => setQPage(qPage + 1)}
          >
            Next
          </button>
        </div>
      </DashboardSection>

      {/* 🔹 MY ANSWERS */}
      <DashboardSection title="My Answers">
        {answers.content.length === 0 && (
          <p className="empty">You haven’t answered any questions yet.</p>
        )}

        {answers.content.map((a) => (
          <DashboardCard key={a.id}>
            {/* Preview */}
            <div
              className="answer-preview"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(a.content),
              }}
            />

            {/* ✅ OPEN MODAL */}
            <button
              className="read-more"
              onClick={() => setOpenAnswer(a)}
            >
              Read full answer →
            </button>

            <div className="meta">
              {a.accepted && <span className="accepted">✔ Accepted</span>}
            </div>

            <div className="card-actions">
              <button
                className="btn danger"
                onClick={() => handleDeleteAnswer(a.id)}
              >
                Delete
              </button>
            </div>
          </DashboardCard>
        ))}

        <div className="pagination">
          <button disabled={aPage === 0} onClick={() => setAPage(aPage - 1)}>
            Prev
          </button>
          <span>Page {aPage + 1}</span>
          <button
            disabled={aPage + 1 >= answers.totalPages}
            onClick={() => setAPage(aPage + 1)}
          >
            Next
          </button>
        </div>
      </DashboardSection>

      {/* ================= ANSWER MODAL ================= */}
      {openAnswer && (
        <div
          className="answer-modal-overlay"
          onClick={() => setOpenAnswer(null)}
        >
          <div
            className="answer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Full Answer</h3>
              <button onClick={() => setOpenAnswer(null)}>✕</button>
            </div>

            <div
              className="modal-content answer-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(openAnswer.content),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
