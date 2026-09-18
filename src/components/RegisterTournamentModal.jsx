import React, { useState } from 'react';
import { X, Trophy, Calendar, MapPin, CheckCircle2, DollarSign } from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function RegisterTournamentModal({ tournament, onClose }) {
  const { registerTeam } = useGameSet();
  const [teamName, setTeamName] = useState('Kurnool Strikers');
  const [contactName, setContactName] = useState('Rahul V.');
  const [phone, setPhone] = useState('+91 98490 12345');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerTeam(tournament.id, teamName);
    setConfirmed(true);
    setTimeout(() => {
      onClose();
    }, 1200);
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
      <div 
        onClick={e => e.stopPropagation()}
        className="animate-rise"
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
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
              Team Entry Desk
            </span>
            <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {tournament.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))' }}>
              {tournament.sport} · {tournament.format} · {tournament.venue}
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
            }}
          >
            <X size={20} />
          </button>
        </div>

        {confirmed ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <CheckCircle2 size={54} style={{ color: 'hsl(var(--primary))', margin: '0 auto 1rem' }} />
            <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Registration Locked In!
            </h3>
            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem' }}>
              {teamName} is registered for {tournament.name}. See you on match day!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{
              backgroundColor: 'hsl(var(--muted) / 0.6)',
              borderRadius: '1rem',
              padding: '1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div>
                <p className="font-mono-ui" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>Entry Fee</p>
                <p style={{ fontSize: '1rem', fontWeight: 800, color: 'hsl(var(--primary))' }}>
                  {tournament.entryFee === 0 ? 'Free' : `₹${tournament.entryFee}`}
                </p>
              </div>
              <div>
                <p className="font-mono-ui" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>Date</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  {tournament.date}
                </p>
              </div>
              <div>
                <p className="font-mono-ui" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>Slots Open</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  {tournament.maxTeams - tournament.teamsRegistered} of {tournament.maxTeams}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Team Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  style={{ width: '100%', height: '44px', padding: '0 0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Captain / Manager Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  style={{ width: '100%', height: '44px', padding: '0 0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Phone / WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', height: '44px', padding: '0 0.85rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.75rem' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.7rem 1.25rem',
                  backgroundColor: 'transparent',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.75rem',
                  color: 'inherit',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  padding: '0.7rem 1.5rem',
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px -3px var(--primary-glow)'
                }}
              >
                Confirm Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
