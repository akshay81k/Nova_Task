// import React from 'react';

// export default function Landing() {
//   return (
//     <div>
//       <h1>Community Q&A — Astronomy & Space</h1>
//       <p>Ask questions, answer others, and upvote helpful answers. This is a simple demo.</p>
//       <p>Use Register / Login to post new questions (live updates supported).</p>
//     </div>
//   );
// }
import React from 'react';
import { Sparkles, UserPlus, LogIn } from 'lucide-react';
import './Landing.css';

function Landing() {
  return (
    <div className="cosmos-container">
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="planet-left" />
      <div className="planet-right" />

      <div className="content">
        <div className="sparkle-icon">
          <Sparkles size={48} />
        </div>

        <div className="title-container">
          <h1 className="title">Cosmos Q&A</h1>
        </div>

        <p className="subtitle">Ask, Answer & Explore the Universe</p>

        <div className="buttons-container">
          <button className="btn btn-register">
            <UserPlus size={20} />
            <span>Register</span>
          </button>
          <button className="btn btn-login">
            <LogIn size={20} />
            <span>Login</span>
          </button>
        </div>

        <p className="footer-text">
          Join our community of space enthusiasts and knowledge seekers
        </p>
      </div>
    </div>
  );
}

export default Landing;
