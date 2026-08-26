import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const mutation = useMutation({
    mutationFn: () => register(form),
    onSuccess: () => window.location.href = "/login",
  });

  return (
    <div className="auth">
      <h2>Register</h2>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="USER">User</option>
        <option value="EXPERT">Expert</option>
      </select>

      <button onClick={() => mutation.mutate()}>Register</button>
    </div>
  );
}
