"use client";
import { useState } from "react";
import styles from "./Chatbot.module.scss";
import { useTheme } from "@/lib/ThemeContext";

export default function Chatbot() {
  const { color } = useTheme();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);
    setInput("");

    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.chatbox}>
          <div
            className={styles.header}
            style={{
              backgroundColor: color,
            }}
          >
            Campus Bot
          </div>
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={styles[msg.sender]}>
                {msg.text}
              </div>
            ))}
            <br />
            {loading && <div className={styles.bot}>Typing...</div>}
          </div>
          <div className={styles.inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything..."
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: color,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        className={styles.fab}
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: color,
          border: `2px solid #fff`,
        }}
      >
        💬
      </button>
    </div>
  );
}
