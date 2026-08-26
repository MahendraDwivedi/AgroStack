// // import { useState } from "react";
// // import { useMutation } from "@tanstack/react-query";
// // import { login } from "../api/auth";
// // import "../styles/auth.css";

// // export default function Login() {
// //   const [form, setForm] = useState({ email: "", password: "" });

// //   const mutation = useMutation({
// //     mutationFn: () => login(form),
// //     onSuccess: () => window.location.href = "/",
// //   });

// //   return (
// //     <div className="auth">
// //       <h2>Login</h2>
// //       <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
// //       <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
// //       <button onClick={() => mutation.mutate()}>Login</button>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { login } from "../api/auth";
// import "../styles/auth.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const mutation = useMutation({
//     mutationFn: () => login(form),

//     onSuccess: (res) => {
//       // 🚫 LOGIN FAILED (banned / invalid)
//       if (!res.success) {
//         setError(res.message); // "User is banned"
//         return;
//       }

//       // ✅ LOGIN SUCCESS
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       window.location.href = "/";
//     },

//     onError: () => {
//       setError("Error Occured....");
//     }
//   });

//   return (
//     <div className="auth">
//       <h2>Login</h2>

//       {error && <p className="error">{error}</p>}

//       <input
//         placeholder="Email"
//         value={form.email}
//         onChange={e => setForm({ ...form, email: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={e => setForm({ ...form, password: e.target.value })}
//       />

//       <button onClick={() => mutation.mutate()} disabled={mutation.isLoading}>
//         {mutation.isLoading ? "Logging in..." : "Login"}
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import "../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => login(form),

    onSuccess: (res) => {
      // ❌ LOGIN FAILED
      if (!res.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setError(res.message);
        return;
      }

      // ✅ LOGIN SUCCESS
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      window.location.href = "/";
    },

    onError: () => {
      setError("Error occurred. Please try again.");
    },
  });

  return (
    <div className="auth">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={() => mutation.mutate()} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
