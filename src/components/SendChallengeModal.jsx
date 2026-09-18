import React, { useState } from 'react';
import { X, Swords, Calendar, Clock, MapPin, Shield } from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function SendChallengeModal({ onClose }) {
  const { sendChallenge, venues } = useGameSet();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    challenger: 'Kurnool Strikers',
    opponent: '',
    sport: 'Football',
    date: '2026-10-02',
    time: '18:30',
    venue: 'Arena 24',
    matchType: 'Competitive · Prize'
  });

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.challenger || !form.opponent || !form.date || !form.time || !form.venue) {
      setError('Fill in every match detail before sending.');
      return;
    }

    sendChallenge(form);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <form 
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
        className="animate-rise"
        style={{
          width: '100%',
          maxWidth: '580px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <span style={{
              display: 'inline-block',
              backgroundColor: 'hsl(var(--primary) / 0.15)',
              color: 'hsl(var(--primary))',
              fontSize: '0.7rem',
              fontWeight: 800,
              fontFamily: 'Space Mono, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              marginBottom: '0.5rem'
            }}>
              1v1 Challenge
            </span>
            <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
              Set the Fixture.
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
              Direct, clear, competitive. No group chat, just a date and decision.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'hsl(var(--muted-foreground))',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '9999px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'hsl(var(--destructive) / 0.15)',
            border: '1px solid hsl(var(--destructive))',
            color: 'hsl(var(--foreground))',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        {/* Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Your Team / Challenger *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Kurnool Strikers"
              value={form.challenger}
              onChange={e => handleChange('challenger', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Opponent Team *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Nandyal United"
              value={form.opponent}
              onChange={e => handleChange('opponent', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Sport
            </label>
            <select
              value={form.sport}
              onChange={e => handleChange('sport', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            >
              <option value="Football">Football</option>
              <option value="Cricket">Cricket</option>
              <option value="Pickleball">Pickleball</option>
              <option value="Basketball">Basketball</option>
              <option value="Badminton">Badminton</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Match Type
            </label>
            <select
              value={form.matchType}
              onChange={e => handleChange('matchType', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            >
              <option value="Competitive · Prize">Competitive · Prize</option>
              <option value="Friendly">Friendly</option>
              <option value="Ranked 1v1">Ranked 1v1</option>
              <option value="Practice Scrimmage">Practice Scrimmage</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Fixture Date *
            </label>
            <input
              type="date"
              required
              value={form.date}
              onChange={e => handleChange('date', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Kickoff Time *
            </label>
            <input
              type="time"
              required
              value={form.time}
              onChange={e => handleChange('time', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Venue *
            </label>
            <select
              value={form.venue}
              onChange={e => handleChange('venue', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            >
              {venues.map(v => (
                <option key={v.id} value={v.name}>
                  {v.name} ({v.type} - {v.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'transparent',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
              color: 'hsl(var(--foreground))',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 0 20px -3px var(--primary-glow)'
            }}
          >
            Issue Challenge
          </button>
        </div>
      </form>
    </div>
  );
}
