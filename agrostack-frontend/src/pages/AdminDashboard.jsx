// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// import { fetchQuestions } from "../api/questions";
// import {
//   fetchAllUsers,
//   banUser,
//   unbanUser,
//   promoteUser,
//   deleteQuestionAdmin,
// } from "../api/admin";

// import StatCard from "../components/dashboard/StatCard";
// import DashboardCard from "../components/dashboard/DashboardCard";
// import DashboardSection from "../components/dashboard/DashboardSection";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import "../styles/admin-dashboard.css";

// export default function AdminDashboard() {
//   const role = localStorage.getItem("role");
//   if (role !== "ADMIN") return <p className="unauthorized">Unauthorized</p>;

//   const queryClient = useQueryClient();

//   const { data: questions = { content: [], totalElements: 0 } } = useQuery({
//     queryKey: ["admin-questions"],
//     queryFn: () => fetchQuestions(0, 5),
//   });

//   const { data: users = [] } = useQuery({
//     queryKey: ["admin-users"],
//     queryFn: fetchAllUsers,
//   });

//   const handleDeleteQuestion = async (id) => {
//     if (!confirm("Delete this question?")) return;
//     await deleteQuestionAdmin(id);
//     toast.success("Question deleted");
//     queryClient.invalidateQueries(["admin-questions"]);
//   };

//   const handleBan = async (id, banned) => {
//     banned ? await unbanUser(id) : await banUser(id);
//     toast.success(banned ? "User unbanned" : "User banned");
//     queryClient.invalidateQueries(["admin-users"]);
//   };

//   const handlePromote = async (id) => {
//     await promoteUser(id);
//     toast.success("User promoted to EXPERT");
//     queryClient.invalidateQueries(["admin-users"]);
//   };

//   // 🔹 CHART DATA
//   const chartData = [
//     { name: "Questions", value: questions.totalElements },
//     { name: "Users", value: users.length },
//   ];

//   return (
//     <div className="dashboard">
//       <h2 className="admin-title">Admin Dashboard</h2>

//       {/* 🔹 STATS */}
//       <div className="dashboard-stats">
//         <StatCard title="Total Questions" value={questions.totalElements} />
//         <StatCard title="Total Users" value={users.length} />
//       </div>

//       {/* 🔹 CHART */}
//       <DashboardSection title="Platform Overview">
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={chartData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#6366f1" />
//           </BarChart>
//         </ResponsiveContainer>
//       </DashboardSection>

//       {/* 🔹 QUESTIONS */}
//       <DashboardSection title="All Questions">
//         {questions.content.map((q) => (
//           <DashboardCard key={q.id}>
//             <b>{q.title}</b>
//             <div className="meta">by {q.username}</div>
//             <button onClick={() => handleDeleteQuestion(q.id)}>Delete</button>
//           </DashboardCard>
//         ))}
//       </DashboardSection>

//       {/* 🔹 USERS */}
//       <DashboardSection title="Users Management">
//         {users.map((u) => (
//           <DashboardCard key={u.id}>
//             <b>{u.username}</b>
//             <div className="meta">{u.email}</div>
//             <div className="meta">Role: {u.role}</div>

//             <div className="actions">
//               <button onClick={() => handlePromote(u.id)}>Promote</button>

//               <button onClick={() => handleBan(u.id, u.banned)}>
//                 {u.banned ? "Unban" : "Ban"}
//               </button>
//             </div>
//           </DashboardCard>
//         ))}
//       </DashboardSection>
//     </div>
//   );
// }


import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { fetchQuestions } from "../api/questions";
import {
  fetchAllUsers,
  banUser,
  unbanUser,
  promoteUser,
  deleteQuestionAdmin,
} from "../api/admin";

import StatCard from "../components/dashboard/StatCard";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardSection from "../components/dashboard/DashboardSection";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/admin-dashboard.css";

export default function AdminDashboard() {
  const role = localStorage.getItem("role");
  if (role !== "ADMIN") {
    return <p className="unauthorized">🚫 Unauthorized access</p>;
  }

  const queryClient = useQueryClient();

  /* ---------------- DATA ---------------- */

  const {
    data: questions = { content: [], totalElements: 0 },
    isLoading: qLoading,
    isError: qError,
  } = useQuery({
    queryKey: ["admin-questions"],
    queryFn: () => fetchQuestions(0, 5),
  });

  const {
    data: users = [],
    isLoading: uLoading,
    isError: uError,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchAllUsers,
  });

  /* ---------------- ACTIONS ---------------- */

  const handleDeleteQuestion = async (id) => {
    if (!confirm("Delete this question permanently?")) return;
    await deleteQuestionAdmin(id);
    toast.success("Question deleted");
    queryClient.invalidateQueries(["admin-questions"]);
  };

  const handleBanToggle = async (id, banned) => {
    banned ? await unbanUser(id) : await banUser(id);
    toast.success(banned ? "User unbanned" : "User banned");
    queryClient.invalidateQueries(["admin-users"]);
  };

  const handlePromote = async (id) => {
    await promoteUser(id);
    toast.success("User promoted to EXPERT");
    queryClient.invalidateQueries(["admin-users"]);
  };

  /* ---------------- CHART ---------------- */

  const chartData = [
    { name: "Questions", value: questions.totalElements },
    { name: "Users", value: users.length },
  ];

  /* ---------------- UI ---------------- */

  if (qError || uError) {
    return <p className="unauthorized">⚠️ Failed to load admin data</p>;
  }

  return (
    <div className="dashboard admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* ===== STATS ===== */}
      <div className="dashboard-stats">
        <StatCard title="Total Questions" value={questions.totalElements} />
        <StatCard title="Total Users" value={users.length} />
      </div>

      {/* ===== OVERVIEW ===== */}
      <DashboardSection title="Platform Overview">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              fill="var(--primary)"
            />
          </BarChart>
        </ResponsiveContainer>
      </DashboardSection>

      {/* ===== QUESTIONS ===== */}
      <DashboardSection title="Recent Questions">
        {qLoading && <p className="empty">Loading questions…</p>}

        {!qLoading && questions.content.length === 0 && (
          <p className="empty">No questions found.</p>
        )}

        {questions.content.map((q) => (
          <DashboardCard key={q.id}>
            <div className="card-main">
              <b>{q.title}</b>
              <div className="meta">by {q.username}</div>
            </div>

            <button
              className="btn danger"
              onClick={() => handleDeleteQuestion(q.id)}
            >
              Delete
            </button>
          </DashboardCard>
        ))}
      </DashboardSection>

      {/* ===== USERS ===== */}
      <DashboardSection title="User Management">
        {uLoading && <p className="empty">Loading users…</p>}

        {!uLoading && users.length === 0 && (
          <p className="empty">No users found.</p>
        )}

        {users.map((u) => (
          <DashboardCard key={u.id}>
            <div className="card-main">
              <b>{u.username}</b>
              <div className="meta">{u.email}</div>

              <span
                className={`role-badge ${u.banned ? "banned" : "active"}`}
              >
                {u.banned ? "BANNED" : u.role}
              </span>
            </div>

            <div className="actions">
              <button
                className="btn success"
                onClick={() => handlePromote(u.id)}
                disabled={u.banned}
              >
                Promote
              </button>

              <button
                className={`btn ${u.banned ? "success" : "warning"}`}
                onClick={() => handleBanToggle(u.id, u.banned)}
              >
                {u.banned ? "Unban" : "Ban"}
              </button>
            </div>
          </DashboardCard>
        ))}
      </DashboardSection>
    </div>
  );
}
