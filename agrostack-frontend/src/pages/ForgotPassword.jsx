import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../api/auth";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => requestPasswordReset(email),
    onSuccess: (response) => {
      if (response.success) {
        setError("");
        setMessage(response.message);
      } else {
        setMessage("");
        setError(response.message);
      }
    },
    onError: () => setError("Unable to request a password reset. Please try again."),
  });

  return (
    <div className="auth">
      <h2>Forgot password</h2>
      <p className="auth-help">Enter your registered email and we’ll send a reset link.</p>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button disabled={!email.trim() || mutation.isPending} onClick={() => mutation.mutate()}>
        {mutation.isPending ? "Sending..." : "Send reset link"}
      </button>
      <Link className="auth-link" to="/login">Back to login</Link>
    </div>
  );
}
