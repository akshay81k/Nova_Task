import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Send } from "lucide-react";
import { socket } from "../socket";
import "./Questions.css";

export default function QuestionDetail({ question }) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [answers, setAnswers] = useState([]);
  const [answerBody, setAnswerBody] = useState("");

  async function loadAnswers() {
    try {
      const res = await fetch(`http://localhost:5000/api/answers/${question._id}`);
      const data = await res.json();
      setAnswers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function submitAnswer(e) {
    e.preventDefault();
    if (!token) return alert("Login to answer");

    try {
      await fetch(`http://localhost:5000/api/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ questionId: question._id, body: answerBody }),
      });
      setAnswerBody("");
    } catch (err) {
      console.error(err);
    }
  }

  async function vote(answerId, type) {
    if (!token) return alert("Login to vote");

    try {
      const res = await fetch(`http://localhost:5000/api/answers/vote/${answerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      setAnswers(prev =>
        prev.map(a =>
          a._id === answerId
            ? { ...a, upvotes: data.upvotes, downvotes: data.downvotes }
            : a
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadAnswers();
    socket.on("newAnswer", (ans) => {
      if (ans.question === question._id) setAnswers((prev) => [ans, ...prev]);
    });
    socket.on("voteUpdated", (ans) => {
      if (ans.question === question._id) {
        setAnswers((prev) =>
          prev.map((a) =>
            a._id === ans._id
              ? { ...a, upvotes: ans.upvotes, downvotes: ans.downvotes }
              : a
          )
        );
      }
    });
    return () => {
      socket.off("newAnswer");
      socket.off("voteUpdated");
    };
  }, []);

  return (
    <div className="qdetail-container">
      <h2 className="qdetail-title">{question.title}</h2>
      <p className="qdetail-body">{question.body}</p>
      <hr className="divider" />

      {/* Post Answer Form */}
      <form onSubmit={submitAnswer} className="answer-form">
        <textarea
          required
          value={answerBody}
          onChange={(e) => setAnswerBody(e.target.value)}
          placeholder="Write your cosmic answer..."
        />
        <button type="submit" className="form-btn">
          <Send size={18} /> Post Answer
        </button>
      </form>

      <h3 className="answers-heading">Answers</h3>
      {answers.length === 0 ? (
        <p className="no-answers">No answers yet</p>
      ) : (
        answers.map((a) => {
          const hasUpvoted = Array.isArray(a.upvotes) && a.upvotes.includes(userId);
          const hasDownvoted = Array.isArray(a.downvotes) && a.downvotes.includes(userId);

          return (
            <div key={a._id} className="answer-card">
              <p>{a.body}</p>
              <small className="answer-meta">
                By: {a.author?.name} · {a.upvotes?.length || 0} Up · {a.downvotes?.length || 0} Down
              </small>
              <div className="vote-btns">
                <button
                  disabled={hasUpvoted}
                  onClick={() => vote(a._id, "up")}
                  className={`vote-btn up ${hasUpvoted ? "disabled" : ""}`}
                >
                  <ArrowUp size={16} /> Upvote
                </button>
                <button
                  disabled={hasDownvoted}
                  onClick={() => vote(a._id, "down")}
                  className={`vote-btn down ${hasDownvoted ? "disabled" : ""}`}
                >
                  <ArrowDown size={16} /> Downvote
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}