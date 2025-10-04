// import React, { useEffect, useState } from 'react';
// import { fetchQuestions, postQuestion } from '../api';
// import QuestionItem from '../components/QuestionItem';
// import QuestionDetail from './QuestionDetail';
// import { socket } from '../socket';

// export default function Questions() {
//   const [questions, setQuestions] = useState([]);
//   const [form, setForm] = useState({ title: '', body: '' });
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     load();
//     socket.on('newQuestion', (q) => {
//       setQuestions(prev => [q, ...prev]);
//     });
//     return () => socket.off('newQuestion');
//   }, []);

//   async function load() {
//     const qs = await fetchQuestions();
//     setQuestions(qs);
//   }

//   async function submit(e) {
//     e.preventDefault();
//     if (!token) return alert('Login to post a question');
//     const res = await postQuestion(token, form);
//     if (res._id) {
//       setForm({ title: '', body: '' });
//     } else {
//       alert(res.message || 'Could not post question');
//     }
//   }

//   // if a question is selected, show QuestionDetail page
//   if (selectedQuestion) {
//     return (
//       <div>
//         <button onClick={() => setSelectedQuestion(null)} style={{ marginBottom: 10 }}>← Back to Questions</button>
//         <QuestionDetail question={selectedQuestion} />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Questions</h2>

//       <form onSubmit={submit} style={{ maxWidth: 600, marginBottom: 20 }}>
//         <div>
//           <input
//             placeholder="Title"
//             required
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             style={{ width: '100%', marginBottom: 8 }}
//           />
//         </div>
//         <div>
//           <textarea
//             placeholder="Details (optional)"
//             value={form.body}
//             onChange={(e) => setForm({ ...form, body: e.target.value })}
//             style={{ width: '100%', marginBottom: 8 }}
//           />
//         </div>
//         <button type="submit">Post Question</button>
//       </form>

//       <div>
//         {questions.length === 0 ? (
//           <div>No questions yet</div>
//         ) : (
//           questions.map(q => (
//             <div key={q._id} onClick={() => setSelectedQuestion(q)} style={{ cursor: 'pointer' }}>
//               <QuestionItem q={q} />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { fetchQuestions, postQuestion } from "../api";
import QuestionItem from "../components/QuestionItem";
import QuestionDetail from "./QuestionDetail";
import { socket } from "../socket";
import "./Questions.css";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    load();
    socket.on("newQuestion", (q) => setQuestions((prev) => [q, ...prev]));
    return () => socket.off("newQuestion");
  }, []);

  async function load() {
    const qs = await fetchQuestions();
    setQuestions(qs);
  }

  async function submit(e) {
    e.preventDefault();
    if (!token) return alert("Login to post a question");
    const res = await postQuestion(token, form);
    if (res._id) setForm({ title: "", body: "" });
    else alert(res.message || "Could not post question");
  }

  if (selectedQuestion) {
    return (
      <div className="questions-container">
        <button onClick={() => setSelectedQuestion(null)} className="back-btn">
          <ArrowLeft size={16} /> Back to Questions
        </button>
        <QuestionDetail question={selectedQuestion} />
      </div>
    );
  }

  return (
    <div className="questions-container">
      <h2 className="questions-heading">Community Questions</h2>
      <form onSubmit={submit} className="question-form">
        <input
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Details (optional)"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <button type="submit" className="form-btn">
          <PlusCircle size={18} /> Post Question
        </button>
      </form>

      <div className="questions-list">
        {questions.length === 0 ? (
          <div className="no-questions">No questions yet</div>
        ) : (
          questions.map((q) => (
            <div key={q._id} onClick={() => setSelectedQuestion(q)}>
              <QuestionItem q={q} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
