import React from 'react';
import { Sparkles, UserPlus, LogIn, MessageSquare, Users, Zap, ArrowRight } from 'lucide-react';
import './Landing.css';

function Landing({ onRegister, onLogin }) {
  return (
    <div className="landing-container">
      {/* Animated Background Elements */}
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

      {/* Main Content */}
      <div className="landing-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Welcome to the Future of Q&A</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line">Explore the</span>
            <span className="title-highlight">Cosmos</span>
            <span className="title-line">of Knowledge</span>
          </h1>

          <p className="hero-description">
            Connect with a global community of curious minds. Ask questions, share insights, 
            and discover answers that expand your understanding of the universe.
          </p>

          <div className="hero-actions">
            <button 
              onClick={onRegister} 
              className="btn btn-primary btn-large"
            >
              <UserPlus size={20} />
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={onLogin} 
              className="btn btn-secondary btn-large"
            >
              <LogIn size={20} />
              <span>Sign In</span>
            </button>
          </div>

          {/* <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Questions Asked</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25K+</div>
              <div className="stat-label">Answers Shared</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5K+</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div> */}
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare size={24} />
              </div>
              <h3 className="feature-title">Ask Anything</h3>
              <p className="feature-description">
                From complex scientific concepts to everyday curiosities, 
                our community is here to help you find answers.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3 className="feature-title">Expert Community</h3>
              <p className="feature-description">
                Connect with knowledgeable individuals from various fields 
                and backgrounds around the world.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h3 className="feature-title">Real-time Updates</h3>
              <p className="feature-description">
                Get instant notifications and updates on questions and answers 
                that matter to you.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-description">
              Join thousands of knowledge seekers and start exploring the cosmos of questions today.
            </p>
            <div className="cta-actions">
              <button 
                onClick={onRegister} 
                className="btn btn-primary btn-large"
              >
                <UserPlus size={20} />
                <span>Join Now</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;
