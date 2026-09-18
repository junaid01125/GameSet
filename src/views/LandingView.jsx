import React from 'react';
import { 
  Trophy, 
  Swords, 
  MapPin, 
  ArrowRight, 
  Shield, 
  Zap, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function LandingView() {
  const { setCurrentView } = useGameSet();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))', overflowX: 'hidden' }}>
      {/* Landing Header */}
      <header style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1.5rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.85rem',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            fontWeight: 800,
            boxShadow: '0 0 20px -2px var(--primary-glow)'
          }}>
            <Zap size={20} />
          </span>
          <span className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            GameSet
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setCurrentView('dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: 'hsl(var(--muted-foreground))',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '0.5rem 0.75rem'
            }}
          >
            Sign in
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            style={{
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              border: 'none',
              borderRadius: '0.75rem',
              padding: '0.65rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 0 20px -3px var(--primary-glow)'
            }}
          >
            Enter GameSet
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '3rem 1.5rem 6rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        alignItems: 'center',
        gap: '3rem'
      }}>
        <div className="animate-rise">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '2rem', height: '2px', backgroundColor: 'hsl(var(--primary))' }} />
            <span className="font-mono-ui" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'hsl(var(--primary))' }}>
              For teams who show up
            </span>
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.06em' }}>
            Make the<br />
            <span style={{ color: 'hsl(var(--primary))' }}>next move.</span>
          </h1>

          <p style={{ marginTop: '1.75rem', fontSize: '1.15rem', color: 'hsl(var(--muted-foreground))', maxWidth: '460px', lineHeight: 1.6 }}>
            The local competition desk for serious teams. Find your tournament. Challenge your rival. Lock in the venue.
          </p>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => setCurrentView('tournaments')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                border: 'none',
                borderRadius: '0.85rem',
                padding: '0.9rem 1.6rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 0 25px -4px var(--primary-glow)'
              }}
            >
              <span>Browse Competition</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'transparent',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.85rem',
                padding: '0.9rem 1.6rem',
                color: 'inherit',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Open Competition Desk</span>
              <Shield size={16} style={{ color: 'hsl(var(--primary))' }} />
            </button>
          </div>
        </div>

        {/* Athletic Pitch Card Visual */}
        <div className="animate-rise animate-rise-delay-1" style={{ position: 'relative', width: '100%', maxWidth: '440px', height: '420px', margin: '0 auto' }}>
          {/* Rotated background card with primary glow */}
          <div style={{
            position: 'absolute',
            inset: '1.5rem',
            transform: 'rotate(-6deg)',
            borderRadius: '2rem',
            backgroundColor: 'hsl(var(--primary))',
            opacity: 0.85,
            boxShadow: '0 20px 40px -10px var(--primary-glow)'
          }} />

          {/* Front Pitch Card */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '2rem',
            border: '1px solid hsl(var(--border))',
            backgroundColor: 'hsl(var(--card))',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
          }}>
            {/* Field lines pattern */}
            <div 
              className="court-grid-pattern"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.35,
                pointerEvents: 'none'
              }}
            />

            {/* Stadium Pitch Circle */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              border: '2px solid hsl(var(--primary) / 0.3)',
              pointerEvents: 'none'
            }} />

            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: 'hsl(var(--primary) / 0.25)',
              pointerEvents: 'none'
            }} />

            {/* Top pill */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-mono-ui" style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'hsl(var(--primary))',
                backgroundColor: 'hsl(var(--muted))',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px'
              }}>
                Match Week
              </span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', boxShadow: '0 0 12px var(--primary-glow)' }} />
            </div>

            {/* Bottom Fixtures Counter */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <p className="font-mono-ui" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(var(--muted-foreground))' }}>
                  This Week
                </p>
                <p className="font-display" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.06em', color: 'hsl(var(--foreground))', marginTop: '0.25rem' }}>
                  37 fixtures
                </p>
              </div>

              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 0 20px -2px var(--primary-glow)'
              }}>
                <Swords size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section style={{
        borderTop: '1px solid hsl(var(--border))',
        borderBottom: '1px solid hsl(var(--border))',
        backgroundColor: 'hsl(var(--card) / 0.6)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          backgroundColor: 'hsl(var(--border))'
        }}>
          <div style={{ backgroundColor: 'hsl(var(--card))', padding: '2.5rem 2rem' }}>
            <Trophy size={26} style={{ color: 'hsl(var(--primary))', marginBottom: '1.25rem' }} />
            <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              Find your field.
            </h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>
              Every tournament worth travelling for, in one focused feed. Filter by sport, format, and prize pool.
            </p>
          </div>

          <div style={{ backgroundColor: 'hsl(var(--card))', padding: '2.5rem 2rem' }}>
            <Swords size={26} style={{ color: 'hsl(var(--primary))', marginBottom: '1.25rem' }} />
            <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              Set the fixture.
            </h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>
              Send a direct 1v1 challenge. No group chat debate. Just a date, kickoff time, and a decision.
            </p>
          </div>

          <div style={{ backgroundColor: 'hsl(var(--card))', padding: '2.5rem 2rem' }}>
            <MapPin size={26} style={{ color: 'hsl(var(--primary))', marginBottom: '1.25rem' }} />
            <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              Play somewhere good.
            </h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>
              Approved turf and grounds with verified lighting and surface specs, checked by the local game.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '5rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.5rem'
      }}>
        <span className="font-mono-ui" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'hsl(var(--primary))' }}>
          The First Whistle Is Yours
        </span>

        <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.05em', maxWidth: '680px', lineHeight: 1.05 }}>
          Your team already has the hunger. Give it a fixture.
        </h2>

        <button
          onClick={() => setCurrentView('dashboard')}
          style={{
            marginTop: '1rem',
            padding: '1rem 2.2rem',
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            border: 'none',
            borderRadius: '0.85rem',
            fontSize: '1rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 0 30px -4px var(--primary-glow)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>Get on the Board</span>
          <ArrowRight size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        borderTop: '1px solid hsl(var(--border))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'hsl(var(--muted-foreground))',
        fontSize: '0.8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 800, color: 'hsl(var(--foreground))' }}>GameSet</span>
          <span>© 2026</span>
        </div>
        <span className="font-mono-ui" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Competition, Localised.
        </span>
      </footer>
    </div>
  );
}
