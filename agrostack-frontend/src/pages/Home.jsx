// import { useState, useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchQuestions } from "../api/questions";
// import { useNavigate } from "react-router-dom";
// import "../styles/home.css";

// export default function Home() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [page, setPage] = useState(0);
//   const size = 10;

//   // 🔍 Search + Filters
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("newest");
//   const [category, setCategory] = useState("ALL");

//   const { data } = useQuery({
//     queryKey: ["questions", page],
//     queryFn: () => fetchQuestions(page, size),
//     keepPreviousData: true,
//   });

//   // 🔥 Extract unique categories
//   const categories = useMemo(() => {
//     if (!data?.content) return [];
//     return ["ALL", ...new Set(data.content.map(q => q.category))];
//   }, [data]);

//   // 🔥 Filter + Sort + Search
//   const processedQuestions = useMemo(() => {
//     if (!data?.content) return [];

//     let list = [...data.content];

//     // Category filter
//     if (category !== "ALL") {
//       list = list.filter(q => q.category === category);
//     }

//     // Search (title + category)
//     if (search.trim()) {
//       const s = search.toLowerCase();
//       list = list.filter(
//         q =>
//           q.title.toLowerCase().includes(s) ||
//           q.category.toLowerCase().includes(s)
//       );
//     }

//     // Sorting
//     if (sort === "votes") {
//       list.sort((a, b) => b.voteCount - a.voteCount);
//     } else if (sort === "unanswered") {
//       list = list.filter(q => q.answerCount === 0);
//     } else {
//       // newest (default)
//       list.sort((a, b) => b.id - a.id);
//     }

//     return list;
//   }, [data, search, sort, category]);

//   // ⭐ Highlight search keyword
//   const highlight = (text) => {
//     if (!search) return text;
//     const regex = new RegExp(`(${search})`, "gi");
//     return text.replace(regex, `<mark>$1</mark>`);
//   };

//   return (
//     <div className="home-container">

//       {/* 🔍 SEARCH */}
//       <div className="search-bar">
//         <input
//           placeholder="Search by title or category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* 🎛 FILTER BAR */}
//       <div className="filter-bar">

//         {/* Sort */}
//         <select value={sort} onChange={(e) => setSort(e.target.value)}>
//           <option value="newest">Newest</option>
//           <option value="votes">Most Voted</option>
//           <option value="unanswered">Unanswered</option>
//         </select>

//         {/* Categories */}
//         <div className="category-pills">
//           {categories.map(c => (
//             <button
//               key={c}
//               className={c === category ? "active" : ""}
//               onClick={() => setCategory(c)}
//             >
//               {c}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 📋 QUESTIONS */}
//       <div className="question-row">
//         <h2>Questions</h2>

//         {processedQuestions.length === 0 && (
//           <p className="empty">No questions found</p>
//         )}

//         {processedQuestions.map(q => (
//           <div key={q.id} className="question-card">

//             {/* CONTENT */}
//             <div className="question-content">
//               <h4
//                 className="question-title"
//                 onClick={() =>
//                   token
//                     ? navigate(`/questions/${q.id}`)
//                     : navigate("/login")
//                 }
//                 dangerouslySetInnerHTML={{
//                   __html: highlight(q.title),
//                 }}
//               />

//               <p
//                 dangerouslySetInnerHTML={{
//                   __html: highlight(q.description.slice(0, 120)),
//                 }}
//               />

//               <small>
//                 <span className="category">{q.category}</span>
//                 • by {q.username}
//               </small>
//             </div>

//             {/* STATS */}
//             <div className="question-stats">
//               <div>{q.voteCount} votes</div>
//               <div>{q.answerCount} answers</div>
//               <div>{q.viewCount} views</div>
//             </div>
//           </div>
//         ))}

//         {/* Pagination */}
//         <div className="pagination">
//           <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>
//             Prev
//           </button>
//           <span>Page {page + 1}</span>
//           <button onClick={() => setPage(p => p + 1)}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useMemo, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchQuestions } from "../api/questions";
// import { useNavigate } from "react-router-dom";
// import "../styles/home.css";
// import AiAssistant from "../components/AiAssistant";

// export default function Home() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [page, setPage] = useState(0);
//   const size = 10;

//   // 🔍 Search + Filters
//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [sort, setSort] = useState("newest");
//   const [category, setCategory] = useState("ALL");

//   // 📌 Bookmarks (LocalStorage)
//   const [bookmarks, setBookmarks] = useState(
//     JSON.parse(localStorage.getItem("bookmarks") || "[]")
//   );

//   // 🔍 Debounce search (400ms)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 400);
//     return () => clearTimeout(timer);
//   }, [search]);

//   const { data } = useQuery({
//     queryKey: ["questions", page],
//     queryFn: () => fetchQuestions(page, size),
//     keepPreviousData: true,
//   });

//   const totalPages = data?.totalPages ?? 1;


//   // 🏷 Categories
//   const categories = useMemo(() => {
//     if (!data?.content) return [];
//     return ["ALL", ...new Set(data.content.map((q) => q.category))];
//   }, [data]);

//   // 📊 Trending Questions (votes + answers)
//   const trending = useMemo(() => {
//     if (!data?.content) return [];
//     return [...data.content]
//       .sort(
//         (a, b) =>
//           b.voteCount + b.answerCount * 2 - (a.voteCount + a.answerCount * 2)
//       )
//       .slice(0, 5);
//   }, [data]);

//   // 🧠 AI-like Suggestions (heuristic)
//   const aiSuggestions = useMemo(() => {
//     if (!debouncedSearch || !data?.content) return [];
//     return data.content
//       .filter((q) =>
//         q.title.toLowerCase().includes(debouncedSearch.toLowerCase())
//       )
//       .slice(0, 3);
//   }, [debouncedSearch, data]);

//   // 🔥 Process Questions
//   const processedQuestions = useMemo(() => {
//     if (!data?.content) return [];
//     let list = [...data.content];

//     if (category !== "ALL") {
//       list = list.filter((q) => q.category === category);
//     }

//     if (debouncedSearch) {
//       const s = debouncedSearch.toLowerCase();
//       list = list.filter(
//         (q) =>
//           q.title.toLowerCase().includes(s) ||
//           q.category.toLowerCase().includes(s)
//       );
//     }

//     if (sort === "votes") {
//       list.sort((a, b) => b.voteCount - a.voteCount);
//     } else if (sort === "unanswered") {
//       list = list.filter((q) => q.answerCount === 0);
//     } else {
//       list.sort((a, b) => b.id - a.id);
//     }

//     return list;
//   }, [data, debouncedSearch, sort, category]);

//   // ⭐ Highlight search
//   const highlight = (text) => {
//     if (!debouncedSearch) return text;
//     const regex = new RegExp(`(${debouncedSearch})`, "gi");
//     return text.replace(regex, `<mark>$1</mark>`);
//   };

//   // 📌 Toggle Bookmark
//   const toggleBookmark = (id) => {
//     let updated;
//     if (bookmarks.includes(id)) {
//       updated = bookmarks.filter((b) => b !== id);
//     } else {
//       updated = [...bookmarks, id];
//     }
//     setBookmarks(updated);
//     localStorage.setItem("bookmarks", JSON.stringify(updated));
//   };
// useEffect(() => {
//   setPage(0);
// }, [debouncedSearch, category, sort]);

//   return (
//     <div className="home-container">
//       {/* 🔍 SEARCH */}
//       <div className="search-bar">
//         <input
//           placeholder="Search by title or category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* 🧠 AI SUGGESTIONS */}
//       {aiSuggestions.length > 0 && (
//         <div className="ai-suggestions">
//           <h4>Suggested Questions</h4>
//           {aiSuggestions.map((q) => (
//             <p key={q.id} onClick={() => navigate(`/questions/${q.id}`)}>
//               🤖 {q.title}
//             </p>
//           ))}
//         </div>
//       )}

//       {/* 📊 TRENDING */}
//       <div className="trending">
//         <h4>🔥 Trending</h4>
//         {trending.map((q) => (
//           <p key={q.id} onClick={() => navigate(`/questions/${q.id}`)}>
//             {q.title}
//           </p>
//         ))}
//       </div>

//       {/* 🎛 FILTER BAR */}
//       <div className="filter-bar">
//         <select value={sort} onChange={(e) => setSort(e.target.value)}>
//           <option value="newest">Newest</option>
//           <option value="votes">Most Voted</option>
//           <option value="unanswered">Unanswered</option>
//         </select>

//         <div className="category-pills">
//           {categories.map((c) => (
//             <button
//               key={c}
//               className={c === category ? "active" : ""}
//               onClick={() => setCategory(c)}
//             >
//               {c}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 📋 QUESTIONS */}
//       <div className="question-row">
//         <h2>Questions</h2>

//         {processedQuestions.map((q) => (
//           <div key={q.id} className="question-card">
//             <div className="question-content">
//               <h4
//                 onClick={() =>
//                   token ? navigate(`/questions/${q.id}`) : navigate("/login")
//                 }
//                 dangerouslySetInnerHTML={{ __html: highlight(q.title) }}
//               />
//               <p
//                 dangerouslySetInnerHTML={{
//                   __html: highlight(q.description.slice(0, 120)),
//                 }}
//               />
//               <small>
//                 {q.category} • by {q.username}
//               </small>
//             </div>

//             <div className="question-stats">
//               <div>{q.voteCount} votes</div>
//               <div>{q.answerCount} answers</div>
//               <div>{q.viewCount} views</div>
//             </div>

//             {/* 📌 Bookmark */}
//             <button
//               className={`bookmark ${bookmarks.includes(q.id) ? "saved" : ""}`}
//               onClick={() => toggleBookmark(q.id)}
//             >
//               {bookmarks.includes(q.id) ? "★" : "☆"}
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//   <button
//     disabled={page === 0}
//     onClick={() => setPage((p) => Math.max(p - 1, 0))}
//   >
//     Prev
//   </button>

//   <span>
//     Page {page + 1} of {totalPages}
//   </span>

//   <button
//     disabled={page + 1 >= totalPages}
//     onClick={() => setPage((p) => p + 1)}
//   >
//     Next
//   </button>
// </div>

//       <AiAssistant questions={data?.content || []} />
//     </div>
//   );
// }


import { useState, useMemo, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../api/questions";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import AiAssistant from "../components/AiAssistant";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const size = 10;

  // 🔍 Search + Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState("ALL");

  // 📌 Bookmarks
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks") || "[]")
  );

  // 🔍 Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // 🔁 Infinite Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["questions"],
    queryFn: ({ pageParam = 0 }) => fetchQuestions(pageParam, size),
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
  });

  // 📦 Flatten all pages
  const allQuestions = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((p) => p.content);
  }, [data]);

  // 🏷 Categories
  const categories = useMemo(() => {
    return ["ALL", ...new Set(allQuestions.map((q) => q.category))];
  }, [allQuestions]);

  // 📊 Trending
  const trending = useMemo(() => {
    return [...allQuestions]
      .sort(
        (a, b) =>
          b.voteCount + b.answerCount * 2 -
          (a.voteCount + a.answerCount * 2)
      )
      .slice(0, 5);
  }, [allQuestions]);

  // 🤖 AI Suggestions
  const aiSuggestions = useMemo(() => {
    if (!debouncedSearch) return [];
    return allQuestions
      .filter((q) =>
        q.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .slice(0, 3);
  }, [debouncedSearch, allQuestions]);

  // 🔥 Process Questions
  const processedQuestions = useMemo(() => {
    let list = [...allQuestions];

    if (category !== "ALL") {
      list = list.filter((q) => q.category === category);
    }

    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      list = list.filter(
        (q) =>
          q.title.toLowerCase().includes(s) ||
          q.category.toLowerCase().includes(s)
      );
    }

    if (sort === "votes") {
      list.sort((a, b) => b.voteCount - a.voteCount);
    } else if (sort === "unanswered") {
      list = list.filter((q) => q.answerCount === 0);
    } else {
      list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [allQuestions, debouncedSearch, sort, category]);

  // ⭐ Highlight
  const highlight = (text) => {
    if (!debouncedSearch) return text;
    const r = new RegExp(`(${debouncedSearch})`, "gi");
    return text.replace(r, `<mark>$1</mark>`);
  };

  // 📌 Bookmark toggle
  const toggleBookmark = (id) => {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((b) => b !== id)
      : [...bookmarks, id];
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  // ⬇️ Infinite Scroll Observer
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="home-container">
      {/* 🔍 SEARCH */}
      <div className="search-bar">
        <input
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🤖 AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <div className="ai-suggestions">
          <h4>Suggested Questions</h4>
          {aiSuggestions.map((q) => (
            <p key={q.id} onClick={() => navigate(`/questions/${q.id}`)}>
              🤖 {q.title}
            </p>
          ))}
        </div>
      )}

      {/* 🔥 Trending */}
      <div className="trending">
        <h4>🔥 Trending</h4>
        {trending.map((q) => (
          <p key={q.id} onClick={() => navigate(`/questions/${q.id}`)}>
            {q.title}
          </p>
        ))}
      </div>

      {/* 🎛 Filters */}
      <div className="filter-bar">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="votes">Most Voted</option>
          <option value="unanswered">Unanswered</option>
        </select>

        <div className="category-pills">
          {categories.map((c) => (
            <button
              key={c}
              className={c === category ? "active" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 📋 QUESTIONS */}
      <div className="question-row">
        <h2>Questions</h2>

        {processedQuestions.map((q) => (
          <div key={q.id} className="question-card">
            <div className="question-content">
              <h4
                onClick={() =>
                  token ? navigate(`/questions/${q.id}`) : navigate("/login")
                }
                dangerouslySetInnerHTML={{ __html: highlight(q.title) }}
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: highlight(q.description.slice(0, 120)),
                }}
              />
              <small>
                {q.category} • by {q.username}
              </small>
            </div>

            <div className="question-stats">
              <div>{q.voteCount} votes</div>
              <div>{q.answerCount} answers</div>
              <div>{q.viewCount} views</div>
            </div>

            <button
              className={`bookmark ${bookmarks.includes(q.id) ? "saved" : ""}`}
              onClick={() => toggleBookmark(q.id)}
            >
              {bookmarks.includes(q.id) ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      {/* ⬇️ Load More Trigger */}
      <div ref={loadMoreRef} />

      {isFetchingNextPage && (
        <p className="loading">Loading more questions...</p>
      )}

      <AiAssistant questions={allQuestions} />
    </div>
  );
}
