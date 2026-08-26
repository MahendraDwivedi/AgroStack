import { useState } from "react";
import { askAi } from "../api/ai";
import "../styles/ai-assistant.css";

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Ask a technical question and I’ll answer like a StackOverflow expert.",
    },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const formatAiText = (text) => {
    if (!text) return "";

    return (
      text
        // 🔥 convert escaped newlines to real ones
        .replace(/\\n\\n/g, "\n\n")
        .replace(/\\n/g, "\n")

        // paragraphs
        .replace(/\n\n+/g, "</p><p>")

        // line breaks
        .replace(/\n/g, "<br/>")

        // bullet cleanup
        .replace(/\*+\s*/g, "• ")
    );
  };

  

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.start();
    setListening(true);

    recog.onresult = (e) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };

    recog.onerror = () => setListening(false);
  };

  const send = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);

    const aiPrompt = `
You are an expert StackOverflow-style assistant.

STRICT RULES:
- Do NOT greet
- Do NOT introduce yourself
- Do NOT explain capabilities
- Answer directly and concisely
- Be technical and professional

User question:
${input}
`;

    try {
      let reply = await askAi(aiPrompt);
      console.log(reply);

      reply = reply.replace(/^(hi|hello|hey)[^a-z0-9]+/i, "").trim();
      console.log(reply);
      

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error getting AI response." },
      ]);
    }

    setInput("");
  };

  return (
    <>
      <button className="ai-fab" onClick={() => setOpen(!open)}>
        🤖
      </button>

      {open && (
        <div className="ai-panel">
          <div className="ai-header">
            AI Assistant
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="ai-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`ai-msg ${m.role}`}
                dangerouslySetInnerHTML={{
                  __html: `<p>${formatAiText(m.text)}</p>`,
                }}
              />
            ))}
          </div>

          <div className="ai-input">
            <button onClick={startVoice}>{listening ? "🎙️" : "🎤"}</button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a technical question..."
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={send}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
