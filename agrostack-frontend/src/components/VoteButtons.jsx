// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { voteAnswer } from "../api/answers";
// import "../styles/vote.css"; 

// export default function VoteButtons({ answer }) {
//   const qc = useQueryClient();

//   const vote = useMutation({
//     mutationFn: (type) => voteAnswer(answer.id, type),
//     onSuccess: () => qc.invalidateQueries(["answers"]),
//   });

//   return (
//     <div style={{ textAlign: "center", marginRight: 10 }}>
//       <button onClick={() => vote.mutate("UP")}>▲</button>
//       <div>{answer.upvotes - answer.downvotes}</div>
//       <button onClick={() => vote.mutate("DOWN")}>▼</button>
//     </div>
//   );
// }


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { voteAnswer } from "../api/answers";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import "../styles/vote.css"; 

export default function VoteButtons({ answer }) {
  const qc = useQueryClient();

  const vote = useMutation({
    mutationFn: (type) => voteAnswer(answer.id, type),
    onSuccess: () => qc.invalidateQueries(["answers"]),
  });

  const score = answer.upvotes - answer.downvotes;

  return (
    <div className="vote-container">
      <button 
        className="vote-btn vote-up"
        onClick={() => vote.mutate("UP")}
        aria-label="Upvote"
      >
        <ThumbsUp size={20} />
      </button>
      
      <div className={`vote-score ${score > 0 ? 'positive' : score < 0 ? 'negative' : ''}`}>
        {score}
      </div>
      
      <button 
        className="vote-btn vote-down"
        onClick={() => vote.mutate("DOWN")}
        aria-label="Downvote"
      >
        <ThumbsDown size={20} />
      </button>
    </div>
  );
}