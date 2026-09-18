import React, { useState } from 'react';
import { X, MapPin, Clock, Calendar, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export function BookVenueModal({ venue, onClose }) {
  const [slotDate, setSlotDate] = useState('2026-09-25');
  const [slotTime, setSlotTime] = useState('18:00 - 19:00');
  const [teamName, setTeamName] = useState('Kurnool Strikers');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      onClose();
    }, 1400);
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
          maxWidth: '500px',
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
              Venue Booking
            </span>
            <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {venue.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))' }}>
              {venue.type} · {venue.address}, {venue.city}
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
              Slot Reserved!
            </h3>
            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem' }}>
              Your slot at {venue.name} for {slotDate} ({slotTime}) has been booked.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{
              backgroundColor: 'hsl(var(--muted) / 0.6)',
              borderRadius: '1rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p className="font-mono-ui" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>
                  Rate
                </p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'hsl(var(--primary))' }}>
                  {venue.priceLabel}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="font-mono-ui" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>
                  Status
                </p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  {venue.availability}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Select Date
                </label>
                <input
                  type="date"
                  required
                  value={slotDate}
                  onChange={e => setSlotDate(e.target.value)}
                  style={{ width: '100%', height: '44px', padding: '0 0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Select Time Slot
                </label>
                <select
                  value={slotTime}
                  onChange={e => setSlotTime(e.target.value)}
                  style={{ width: '100%', height: '44px', padding: '0 0.85rem' }}
                >
                  <option value="06:00 - 07:00">06:00 - 07:00 (Early Morning)</option>
                  <option value="07:00 - 08:00">07:00 - 08:00</option>
                  <option value="17:00 - 18:00">17:00 - 18:00 (Sunset)</option>
                  <option value="18:00 - 19:00">18:00 - 19:00 (Floodlight)</option>
                  <option value="19:00 - 20:00">19:00 - 20:00 (Prime Time)</option>
                  <option value="20:00 - 21:00">20:00 - 21:00 (Night Match)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Booking Team
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
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
                Lock In Slot
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
