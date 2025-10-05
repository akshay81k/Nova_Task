import React from "react";
import "../pages/Questions.css";

export default function QuestionItem({ q }) {
  return (
    <div className="question-card">
      <h3>{q.title}</h3>
      <p>{q.body}</p>
      <small className="question-meta">
        Asked by: {q.author?.name || "Unknown"} ·{" "}
        {new Date(q.createdAt).toLocaleString()}
      </small>
      <div className="question-stats">
        <small>Answers: {q.answersCount || 0}</small>
      </div>
    </div>
  );
}