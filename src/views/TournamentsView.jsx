import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Search, 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function TournamentsView() {
  const { 
    tournaments, 
    setIsCreateTournamentOpen, 
    setRegisterTournamentModal 
  } = useGameSet();

  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');

  const sports = ['All', 'Football', 'Pickleball', 'Cricket', 'Basketball', 'Badminton'];

  const filteredTournaments = useMemo(() => {
    return tournaments.filter(t => {
      const matchSearch = `${t.name} ${t.sport} ${t.venue} ${t.organizer}`.toLowerCase().includes(search.toLowerCase());
      const matchSport = selectedSport === 'All' || t.sport.toLowerCase() === selectedSport.toLowerCase();
      return matchSearch && matchSport;
    });
  }, [tournaments, search, selectedSport]);

  const getAccentColor = (accent) => {
    switch (accent) {
      case 'emerald': return '#00e599';
      case 'cyan': return '#06b6d4';
      case 'amber': return '#f59e0b';
      case 'violet': return '#a855f7';
      default: return 'hsl(var(--primary))';
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <section className="animate-rise" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="font-mono-ui" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'hsl(var(--primary))' }}>
              Open Competition
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'hsl(var(--primary))' }} />
            <span className="font-mono-ui" style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))' }}>
              Verified Leagues
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.05 }}>
            Find your tournament.
          </h1>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'hsl(var(--muted-foreground))', maxWidth: '540px' }}>
            The best local fixtures, without the noise. Register your roster or create your own tournament.
          </p>
        </div>

        <button
          onClick={() => setIsCreateTournamentOpen(true)}
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
          <span>Create Tournament</span>
        </button>
      </section>

      {/* Filter Bar */}
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
          <input
            type="search"
            placeholder="Search by name, sport or venue..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              height: '48px',
              paddingLeft: '2.75rem',
              paddingRight: '1rem',
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.85rem'
            }}
          />
        </div>

        {/* Sport Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {sports.map(s => {
            const active = selectedSport === s;
            return (
              <button
                key={s}
                onClick={() => setSelectedSport(s)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '0.75rem',
                  border: active ? '1px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
                  backgroundColor: active ? 'hsl(var(--secondary))' : 'hsl(var(--card))',
                  color: active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tournaments Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {filteredTournaments.map(t => {
          const slotsLeft = Math.max(0, t.maxTeams - t.teamsRegistered);
          return (
            <article
              key={t.id}
              className="card-hover animate-rise"
              style={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Top accent line */}
              <div style={{ height: '6px', backgroundColor: getAccentColor(t.accent) }} />

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    backgroundColor: 'hsl(var(--primary) / 0.15)',
                    color: 'hsl(var(--primary))',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    fontFamily: 'Space Mono, monospace'
                  }}>
                    {t.status || 'Open'}
                  </span>
                  <span className="font-mono-ui" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))' }}>
                    {t.sport}
                  </span>
                </div>

                <div>
                  <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em' }}>
                    {t.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
                    {t.format} · Organized by {t.organizer}
                  </p>
                </div>

                {/* Info Pills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.825rem', color: 'hsl(var(--foreground))', margin: '0.5rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={15} style={{ color: 'hsl(var(--primary))' }} />
                      <span>{t.date}</span>
                    </div>
                    <span className="font-mono-ui" style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))' }}>
                      Closes {t.registrationCloses}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={15} style={{ color: 'hsl(var(--primary))' }} />
                    <span>{t.venue}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ backgroundColor: 'hsl(var(--muted) / 0.6)', borderRadius: '0.85rem', padding: '0.85rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    <span style={{ color: 'hsl(var(--muted-foreground))' }}>Registered</span>
                    <span className="font-mono-ui" style={{ color: 'hsl(var(--primary))' }}>
                      {t.teamsRegistered} / {t.maxTeams} Teams ({slotsLeft} slots left)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'hsl(var(--background))', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${(t.teamsRegistered / t.maxTeams) * 100}%`,
                      height: '100%',
                      backgroundColor: getAccentColor(t.accent),
                      borderRadius: '9999px'
                    }} />
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{
                padding: '1.25rem 1.75rem',
                borderTop: '1px solid hsl(var(--border))',
                backgroundColor: 'hsl(var(--muted) / 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span className="font-mono-ui" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>
                    Entry Fee
                  </span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'hsl(var(--primary))' }}>
                    {t.entryFee === 0 ? 'Free' : `₹${t.entryFee}`}
                  </p>
                </div>

                <button
                  onClick={() => setRegisterTournamentModal(t)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 0 15px -3px var(--primary-glow)'
                  }}
                >
                  Register Team
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {filteredTournaments.length === 0 && (
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          backgroundColor: 'hsl(var(--card))',
          borderRadius: '1.5rem',
          border: '1px dashed hsl(var(--border))'
        }}>
          <Trophy size={48} style={{ color: 'hsl(var(--muted-foreground))', margin: '0 auto 1rem' }} />
          <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            No tournaments found
          </h3>
          <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Try searching for another sport or clear your filters.
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedSport('All'); }}
            style={{
              padding: '0.65rem 1.25rem',
              backgroundColor: 'hsl(var(--secondary))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
              color: 'inherit',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
