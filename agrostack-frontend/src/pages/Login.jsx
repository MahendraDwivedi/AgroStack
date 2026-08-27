import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
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

      <button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
        {mutation.isPending ? "Logging in..." : "Login"}
      </button>

      <Link className="auth-link" to="/forgot-password">
        Forgot password?
      </Link>
    </div>
  );
}
