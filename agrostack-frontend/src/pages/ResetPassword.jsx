import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/auth";
import "../styles/auth.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => resetPassword({ token, password }),
    onSuccess: (response) => {
      if (response.success) {
        setError("");
        setMessage(response.message);
      } else {
        setMessage("");
        setError(response.message);
      }
    },
    onError: () => setError("Unable to reset your password. Please try again."),
  });

  const submit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="auth">
      <h2>Set a new password</h2>
      {!token ? (
        <p className="error">This password-reset link is invalid.</p>
      ) : (
        <>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          {!message && (
            <>
              <input
                type="password"
                placeholder="New password (minimum 8 characters)"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <button disabled={mutation.isPending} onClick={submit}>
                {mutation.isPending ? "Saving..." : "Reset password"}
              </button>
            </>
          )}
        </>
      )}
      <Link className="auth-link" to="/login">Back to login</Link>
    </div>
  );
}
