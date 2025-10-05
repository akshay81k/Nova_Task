import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { register } from '../api';
import './Register.css'; // create this for custom styles

export default function Register({ onDone }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    const res = await register(form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      onDone && onDone();
    } else {
      setErr(res.message || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <UserPlus size={28} className="form-icon" />
          <h2>Create Account</h2>
        </div>
        {err && <div className="form-error">{err}</div>}
        <form onSubmit={submit} className="form-body">
          <div className="form-group">
            <label>Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="form-btn">Register</button>
        </form>
      </div>
    </div>
  );
}