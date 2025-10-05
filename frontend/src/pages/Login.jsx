import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { login } from '../api';
import './Login.css'; // create this CSS file

export default function Login({ onDone }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    const res = await login(form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      onDone && onDone();
    } else {
      setErr(res.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <LogIn size={28} className="form-icon" />
          <h2>Welcome Back</h2>
        </div>
        {err && <div className="form-error">{err}</div>}
        <form onSubmit={submit} className="form-body">
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
          <button type="submit" className="form-btn">Login</button>
        </form>
      </div>
    </div>
  );
}