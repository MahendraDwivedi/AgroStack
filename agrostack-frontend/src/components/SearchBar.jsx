import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) onSearch(q);
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Search questions..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button>Search</button>
    </form>
  );
}
