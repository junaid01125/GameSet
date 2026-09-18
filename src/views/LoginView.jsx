import React, { useState } from 'react';
import { 
  Zap, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck 
} from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function LoginView() {
  const { login } = useGameSet();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!name || !email || !password) {
        setError('Please fill in all fields to create your account.');
        return;
      }
      login({
        name: name,
        team: `${name}'s Squad`,
        email: email,
        role: 'Player / Captain',
        city: 'Kurnool',
        matchesPlayed: 0,
        wins: 0,
        winRate: '0%'
      });
    } else {
      if (!email || !password) {
        setError('Please enter your email and password.');
        return;
      }
      login({
        name: name || 'Player',
        team: 'Fresh Squad',
        email: email,
        role: 'Player',
        city: 'Kurnool',
        matchesPlayed: 0,
        wins: 0,
        winRate: '0%'
      });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Antigravity Minimal Radial Lighting */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '520px',
        height: '380px',
        background: 'radial-gradient(ellipse at center, var(--primary-glow) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        opacity: 0.6
      }} />

      {/* Clean Auth Card */}
      <div 
        className="animate-rise"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Brand Icon & Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: '1rem',
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            boxShadow: '0 0 24px -2px var(--primary-glow)',
            marginBottom: '1rem'
          }}>
            <Zap size={24} strokeWidth={2.8} />
          </div>

          <h1 className="font-display" style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            GameSet
          </h1>
          <p style={{
            fontSize: '0.85rem',
            color: 'hsl(var(--muted-foreground))',
            marginTop: '0.35rem'
          }}>
            {isSignUp ? 'Create your player account' : 'Sign in to your competition desk'}
          </p>
        </div>

        {/* Error message if any */}
        {error && (
          <div style={{
            backgroundColor: 'hsl(var(--destructive) / 0.12)',
            border: '1px solid hsl(var(--destructive) / 0.3)',
            color: 'hsl(var(--destructive))',
            padding: '0.65rem 0.85rem',
            borderRadius: '0.65rem',
            fontSize: '0.8rem',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        {/* Clean Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', marginBottom: '0.35rem' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Varma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', height: '44px', paddingLeft: '2.5rem', paddingRight: '0.85rem' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', marginBottom: '0.35rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', height: '44px', paddingLeft: '2.5rem', paddingRight: '0.85rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', marginBottom: '0.35rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', height: '44px', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'hsl(var(--muted-foreground))',
                  cursor: 'pointer',
                  padding: '0.2rem'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '0.5rem',
              height: '46px',
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 0 20px -3px var(--primary-glow)',
              transition: 'opacity 0.15s ease'
            }}
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Clean Toggle Link */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid hsl(var(--border))',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setError('');
                setIsSignUp(!isSignUp);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'hsl(var(--primary))',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '0 0.25rem'
              }}
            >
              {isSignUp ? 'Sign in' : 'Create account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
