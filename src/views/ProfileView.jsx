import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  MapPin, 
  Trophy, 
  Swords, 
  LogOut, 
  Check, 
  Calendar,
  Zap,
  Activity,
  Award
} from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function ProfileView() {
  const { currentUser, updateProfile, logout, tournaments, challenges } = useGameSet();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [team, setTeam] = useState(currentUser?.team || '');
  const [city, setCity] = useState(currentUser?.city || 'Kurnool');
  const [saved, setSaved] = useState(false);

  const myChallengesCount = challenges.filter(c => 
    c.challenger?.toLowerCase().includes((currentUser?.name || '').toLowerCase()) ||
    c.challenger?.toLowerCase().includes((currentUser?.team || '').toLowerCase())
  ).length;

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, team, city });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Profile Header */}
      <section className="animate-rise" style={{
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '1.5rem',
        padding: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            width: '4.5rem',
            height: '4.5rem',
            borderRadius: '1.25rem',
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            display: 'grid',
            placeItems: 'center',
            fontSize: '1.8rem',
            fontWeight: 900,
            boxShadow: '0 0 25px -4px var(--primary-glow)'
          }}>
            {name ? name.charAt(0).toUpperCase() : 'P'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h1 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
                {currentUser?.name}
              </h1>
              <span style={{
                backgroundColor: 'hsl(var(--secondary))',
                color: 'hsl(var(--primary))',
                fontSize: '0.7rem',
                fontWeight: 800,
                fontFamily: 'Space Mono, monospace',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                textTransform: 'uppercase'
              }}>
                {currentUser?.role || 'Player'}
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.2rem' }}>
              {currentUser?.team} · {currentUser?.city || 'Kurnool, AP'}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.15rem' }}>
              {currentUser?.email}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.15rem',
            borderRadius: '0.75rem',
            backgroundColor: 'hsl(var(--destructive) / 0.12)',
            color: 'hsl(var(--destructive))',
            border: '1px solid hsl(var(--destructive) / 0.25)',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </section>

      {/* Stats Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.25rem',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ width: '2.8rem', height: '2.8rem', borderRadius: '0.75rem', backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--primary))', display: 'grid', placeItems: 'center' }}>
            <Activity size={20} />
          </div>
          <div>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>{currentUser?.matchesPlayed || 14}</p>
            <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.2rem' }}>Matches Played</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.25rem',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ width: '2.8rem', height: '2.8rem', borderRadius: '0.75rem', backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--accent))', display: 'grid', placeItems: 'center' }}>
            <Award size={20} />
          </div>
          <div>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>{currentUser?.wins || 11}</p>
            <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.2rem' }}>Fixtures Won</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.25rem',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ width: '2.8rem', height: '2.8rem', borderRadius: '0.75rem', backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--primary))', display: 'grid', placeItems: 'center' }}>
            <Trophy size={20} />
          </div>
          <div>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>{currentUser?.winRate || '78%'}</p>
            <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.2rem' }}>Win Efficiency</p>
          </div>
        </div>
      </section>

      {/* Edit Details Form */}
      <section style={{
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '1.5rem',
        padding: '2rem'
      }}>
        <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          Player & Team Details
        </h2>

        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', marginBottom: '0.4rem' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', marginBottom: '0.4rem' }}>
              Squad / Team Name
            </label>
            <input
              type="text"
              value={team}
              onChange={e => setTeam(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', marginBottom: '0.4rem' }}>
              City / Region
            </label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', marginBottom: '0.4rem' }}>
              Account Email
            </label>
            <input
              type="email"
              disabled
              value={currentUser?.email || ''}
              style={{ width: '100%', height: '44px', padding: '0 0.85rem', opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            {saved && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--accent))', fontSize: '0.85rem', fontWeight: 700 }}>
                <Check size={16} />
                Profile updated!
              </span>
            )}
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: '0 0 20px -3px var(--primary-glow)'
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
