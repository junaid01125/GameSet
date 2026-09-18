import React, { useState } from 'react';
import { 
  Swords, 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  X, 
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function ChallengesView() {
  const { 
    challenges, 
    currentUser,
    setIsSendChallengeOpen, 
    updateChallengeStatus,
    cancelChallenge
  } = useGameSet();

  const [statusFilter, setStatusFilter] = useState('all');
  const [cancellingId, setCancellingId] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');

  const filteredChallenges = challenges.filter(c => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <section className="animate-rise" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="font-mono-ui" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'hsl(var(--primary))' }}>
              Direct Competition
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'hsl(var(--primary))' }} />
            <span className="font-mono-ui" style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))' }}>
              1v1 Match Desk
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.05 }}>
            Challenge desk.
          </h1>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'hsl(var(--muted-foreground))', maxWidth: '540px' }}>
            No endless WhatsApp group chat. No maybe. Just a fixture, a verified turf, and a winner.
          </p>
        </div>

        <button
          onClick={() => setIsSendChallengeOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            border: 'none',
            borderRadius: '0.85rem',
            padding: '0.75rem 1.25rem',
            fontSize: '0.9rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 0 20px -3px var(--primary-glow)'
          }}
        >
          <Plus size={18} strokeWidth={3} />
          <span>Post a Challenge</span>
        </button>
      </section>

      {/* Filter Tabs */}
      <section style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {['all', 'posted', 'pending', 'accepted', 'rejected'].map(status => {
          const active = statusFilter === status;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '0.75rem',
                border: active ? '1px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
                backgroundColor: active ? 'hsl(var(--secondary))' : 'hsl(var(--card))',
                color: active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'capitalize',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {status}
            </button>
          );
        })}
      </section>

      {/* Challenges Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {filteredChallenges.map(c => {
          const isPending = c.status === 'pending';
          const isAccepted = c.status === 'accepted';
          const isMine = c.ownerEmail === currentUser?.email || (!c.ownerEmail && c.challenger === currentUser?.team);

          return (
            <article
              key={c.id}
              className="card-hover animate-rise"
              style={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '1.5rem',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{
                    backgroundColor: isMine ? 'hsl(var(--secondary))' : isPending ? 'hsl(var(--primary) / 0.15)' : isAccepted ? 'rgba(46, 213, 115, 0.15)' : 'hsl(var(--muted))',
                    color: isMine ? 'hsl(var(--primary))' : isPending ? 'hsl(var(--primary))' : isAccepted ? '#2ed573' : 'hsl(var(--muted-foreground))',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    fontFamily: 'Space Mono, monospace'
                  }}>
                    {isMine ? 'Posted' : c.status}
                  </span>

                  <span className="font-mono-ui" style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                    {c.sport} · {c.matchType}
                  </span>
                </div>

                {/* Match Teams */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.25rem 0',
                  borderTop: '1px solid hsl(var(--border) / 0.5)',
                  borderBottom: '1px solid hsl(var(--border) / 0.5)',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <p className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.2 }}>
                      {c.challenger}
                    </p>
                    <span className="font-mono-ui" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>
                      Challenger
                    </span>
                  </div>

                  <span className="font-display" style={{
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    color: 'hsl(var(--primary))',
                    fontStyle: 'italic'
                  }}>
                    VS
                  </span>

                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <p className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.2 }}>
                      {c.opponent || 'Open Challenge'}
                    </p>
                    <span className="font-mono-ui" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>
                      Opponent
                    </span>
                  </div>
                </div>

                {/* Fixture meta */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} style={{ color: 'hsl(var(--primary))' }} />
                    <span style={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}>{c.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={14} style={{ color: 'hsl(var(--primary))' }} />
                    <span style={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}>{c.time} IST</span>
                  </div>
                  <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={14} style={{ color: 'hsl(var(--primary))' }} />
                    <span style={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}>{c.venue}</span>
                  </div>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div style={{ marginTop: '1.5rem' }}>
                {isMine ? (
                  <div style={{
                    backgroundColor: 'hsl(var(--secondary))',
                    borderRadius: '0.75rem',
                    padding: '0.65rem 1rem',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'hsl(var(--primary))'
                  }}>
                    <div>Posted by you</div>
                    <button
                      onClick={() => { setCancellingId(c.id); setCancellationReason(''); }}
                      style={{ marginTop: '0.65rem', padding: '0.5rem 0.85rem', backgroundColor: 'transparent', border: '1px solid hsl(var(--destructive) / 0.35)', borderRadius: '0.6rem', color: 'hsl(var(--destructive))', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Remove Challenge
                    </button>
                    {cancellingId === c.id && (
                      <div style={{ marginTop: '0.75rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '0.35rem', color: 'hsl(var(--foreground))' }}>Why is it cancelled?</label>
                        <textarea required value={cancellationReason} onChange={e => setCancellationReason(e.target.value)} placeholder="State the reason" style={{ width: '100%', minHeight: '72px', padding: '0.65rem', resize: 'vertical' }} />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button type="button" onClick={() => setCancellingId(null)} style={{ padding: '0.45rem 0.7rem', background: 'transparent', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem', color: 'inherit', cursor: 'pointer' }}>Keep</button>
                          <button type="button" onClick={() => { cancelChallenge(c.id, cancellationReason); setCancellingId(null); }} disabled={!cancellationReason.trim()} style={{ padding: '0.45rem 0.7rem', background: 'hsl(var(--destructive))', border: 'none', borderRadius: '0.5rem', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Confirm Removal</button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : isPending ? (
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => updateChallengeStatus(c.id, 'accepted')}
                      style={{
                        flex: 1,
                        padding: '0.65rem 1rem',
                        backgroundColor: 'hsl(var(--primary))',
                        color: 'hsl(var(--primary-foreground))',
                        border: 'none',
                        borderRadius: '0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 0 15px -3px var(--primary-glow)'
                      }}
                    >
                      <Check size={16} strokeWidth={3} />
                      <span>Accept Fixture</span>
                    </button>
                    <button
                      onClick={() => updateChallengeStatus(c.id, 'rejected')}
                      style={{
                        padding: '0.65rem 1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.75rem',
                        color: 'hsl(var(--muted-foreground))',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <div style={{
                    backgroundColor: 'hsl(var(--muted) / 0.5)',
                    borderRadius: '0.75rem',
                    padding: '0.65rem 1rem',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: isAccepted ? '#2ed573' : 'hsl(var(--muted-foreground))'
                  }}>
                    {isAccepted ? '✓ Fixture Confirmed on Calendar' : '✕ Match Declined'}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {filteredChallenges.length === 0 && (
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          backgroundColor: 'hsl(var(--card))',
          borderRadius: '1.5rem',
          border: '1px dashed hsl(var(--border))'
        }}>
          <Swords size={48} style={{ color: 'hsl(var(--muted-foreground))', margin: '0 auto 1rem' }} />
          <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            No {statusFilter === 'all' ? '' : statusFilter} challenges
          </h3>
          <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Put a proper fixture on the calendar. Your next rival is out there.
          </p>
          <button
            onClick={() => setIsSendChallengeOpen(true)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              border: 'none',
              borderRadius: '0.85rem',
              fontSize: '0.875rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Post a Challenge
          </button>
        </div>
      )}
    </div>
  );
}
