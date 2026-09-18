import React, { useState } from 'react';
import { X, Trophy, Calendar, MapPin, Users, DollarSign, Sparkles } from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function CreateTournamentModal({ onClose }) {
  const { createTournament, currentUser } = useGameSet();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    sport: 'Football',
    format: '5-a-side',
    venue: 'Arena 24',
    date: '2026-10-15',
    registrationCloses: '2026-10-10',
    maxTeams: 16,
    entryFee: 1500,
    organizer: currentUser?.team || `${currentUser?.name || 'Player'}'s Squad`
  });

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.venue || !form.date || !form.organizer) {
      setError('Add a name, venue, date and organizer to publish.');
      return;
    }

    createTournament({
      ...form,
      maxTeams: Number(form.maxTeams),
      entryFee: Number(form.entryFee)
    });

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
          maxWidth: '640px',
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
              Organizer Desk
            </span>
            <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
              Create a Tournament
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
              Put a proper competition on the board for local teams.
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

        {/* Form Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Tournament Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Kurnool Monsoon Cup"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
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
              <option value="Pickleball">Pickleball</option>
              <option value="Cricket">Cricket</option>
              <option value="Basketball">Basketball</option>
              <option value="Badminton">Badminton</option>
              <option value="Tennis">Tennis</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Format / Rules
            </label>
            <input
              type="text"
              placeholder="e.g. 5-a-side, Men's doubles, T20"
              value={form.format}
              onChange={e => handleChange('format', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Venue *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Arena 24, PlayFit"
              value={form.venue}
              onChange={e => handleChange('venue', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Organizer / Host *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. GameSet Kurnool"
              value={form.organizer}
              onChange={e => handleChange('organizer', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Tournament Date *
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
              Registration Closes
            </label>
            <input
              type="date"
              value={form.registrationCloses}
              onChange={e => handleChange('registrationCloses', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Max Teams
            </label>
            <input
              type="number"
              min="2"
              max="64"
              value={form.maxTeams}
              onChange={e => handleChange('maxTeams', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Entry Fee (₹)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              placeholder="0 for free"
              value={form.entryFee}
              onChange={e => handleChange('entryFee', e.target.value)}
              style={{ width: '100%', height: '46px', padding: '0 0.85rem' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
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
            Publish Tournament
          </button>
        </div>
      </form>
    </div>
  );
}
