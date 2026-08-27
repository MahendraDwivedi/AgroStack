import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
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

      <button onClick={() => mutation.mutate()}>Register</button>
    </div>
  );
}
