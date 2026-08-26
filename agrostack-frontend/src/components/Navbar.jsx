// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "../styles/navbar.css";

// export default function Navbar() {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "light"
//   );

//   // Apply theme to body
//   useEffect(() => {
//     document.body.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/" className="logo">AgroStack</Link>

//       <div className="nav-links">
//         {token && <Link to="/ask">Ask</Link>}
//         {token && <Link to="/dashboard">Dashboard</Link>}
//         {role === "ADMIN" && <Link to="/admin">Admin</Link>}

//         {!token && <Link to="/login">Login</Link>}
//         {!token && <Link to="/register">Register</Link>}

//         {/* 🌗 Theme Toggle */}
//         <button className="theme-btn" onClick={toggleTheme}>
//           {theme === "light" ? "🌙 Dark" : "☀️ Light"}
//         </button>

//         {token && (
//           <button
//             className="logout-btn"
//             onClick={() => {
//               localStorage.clear();
//               window.location.href = "/";
//             }}
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">AgroStack</Link>

      <div className="nav-links">
        {token && <Link to="/ask">Ask</Link>}
        {token && <Link to="/dashboard">Dashboard</Link>}
        {role === "ADMIN" && <Link to="/admin">Admin</Link>}

        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {token && (
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
