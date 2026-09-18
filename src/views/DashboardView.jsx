import React from 'react';
import { 
  Trophy, 
  Swords, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Clock, 
  Check, 
  X, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  Plus,
  Users
} from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function DashboardView() {
  const { 
    currentUser, 
    setCurrentView, 
    metrics, 
    challenges, 
    updateChallengeStatus,
    setIsSendChallengeOpen,
    setIsCreateTournamentOpen,
    setRegisterTournamentModal,
    setSelectedVenueId
  } = useGameSet();

  const { activeTournamentsCount, openChallengesCount, upcomingMatchesCount, nextMatch, featuredTournament } = metrics;
  const recentChallenges = challenges.slice(0, 3);
  const isNewPlayer = (currentUser?.matchesPlayed ?? 0) === 0 && (currentUser?.wins ?? 0) === 0;

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Clean Welcome Banner */}
      <section className="animate-rise" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '1.5rem',
        borderBottom: '1px solid hsl(var(--border))',
        paddingBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
            <span style={{
              backgroundColor: 'hsl(var(--primary) / 0.15)',
              color: 'hsl(var(--primary))',
              fontSize: '0.7rem',
              fontWeight: 800,
              fontFamily: 'Space Mono, monospace',
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em'
            }}>
              Squad Active
            </span>
            <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.8rem' }}>
              {currentUser?.team} · #{currentUser?.jersey}
            </span>
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Welcome, {currentUser?.name?.split(' ')[0] || 'Player'}.
          </h1>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'hsl(var(--muted-foreground))' }}>
            Your local competition hub. All upcoming fixtures, pending 1v1 challenges, and turf bookings.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
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
              padding: '0.75rem 1.35rem',
              fontSize: '0.9rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 0 20px -3px var(--primary-glow)'
            }}
          >
            <Plus size={16} strokeWidth={3} />
            <span>Post a Challenge</span>
          </button>
        </div>
      </section>

      {/* Metric Cards - Minimal & Clean */}
      <section className="animate-rise animate-rise-delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        <div 
          onClick={() => setCurrentView('tournaments')}
          className="card-hover"
          style={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}
        >
          <div style={{
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: '1rem',
            backgroundColor: 'hsl(var(--muted))',
            color: 'hsl(var(--primary))',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0
          }}>
            <Trophy size={22} />
          </div>
          <div>
            <span className="font-display" style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>
              {activeTournamentsCount}
            </span>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '0.2rem' }}>
              Active Tournaments
            </p>
            <p className="font-mono-ui" style={{ fontSize: '0.7rem', color: 'hsl(var(--primary))' }}>
              Open registration
            </p>
          </div>
        </div>

        <div 
          onClick={() => setCurrentView('challenges')}
          className="card-hover"
          style={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}
        >
          <div style={{
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: '1rem',
            backgroundColor: 'hsl(var(--primary) / 0.15)',
            color: 'hsl(var(--primary))',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0
          }}>
            <Swords size={22} />
          </div>
          <div>
            <span className="font-display" style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1, color: 'hsl(var(--primary))' }}>
              {openChallengesCount}
            </span>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '0.2rem' }}>
              Open 1v1 Challenges
            </p>
            <p className="font-mono-ui" style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))' }}>
              Action required
            </p>
          </div>
        </div>

        <div 
          onClick={() => setCurrentView('challenges')}
          className="card-hover"
          style={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}
        >
          <div style={{
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: '1rem',
            backgroundColor: 'hsl(var(--muted))',
            color: 'hsl(var(--primary))',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0
          }}>
            <Calendar size={22} />
          </div>
          <div>
            <span className="font-display" style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>
              {upcomingMatchesCount}
            </span>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '0.2rem' }}>
              Upcoming Fixtures
            </p>
            <p className="font-mono-ui" style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))' }}>
              Locked on calendar
            </p>
          </div>
        </div>
      </section>

      {isNewPlayer && (
        <section className="animate-rise animate-rise-delay-2" style={{
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.75rem',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)'
        }}>
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            margin: '0 auto 1rem',
            borderRadius: '1rem',
            backgroundColor: 'hsl(var(--primary) / 0.15)',
            color: 'hsl(var(--primary))',
            display: 'grid',
            placeItems: 'center'
          }}>
            <Zap size={24} />
          </div>
          <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900 }}>
            Start your competition journey
          </h2>
          <p style={{ maxWidth: '520px', margin: '0.65rem auto 1.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.95rem' }}>
            Your player profile is ready. Find a tournament, discover a venue, or challenge another squad to make your first fixture.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={() => setCurrentView('tournaments')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.75rem 1.15rem',
                border: 'none',
                borderRadius: '0.75rem',
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Browse Tournaments <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setCurrentView('venues')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.75rem 1.15rem',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.75rem',
                backgroundColor: 'transparent',
                color: 'inherit',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Explore Venues <MapPin size={16} />
            </button>
          </div>
        </section>
      )}

      {/* Hero Match Fixture Banner */}
      <section className="animate-rise animate-rise-delay-2" style={{
        display: isNewPlayer || !nextMatch ? 'none' : undefined,
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '1.75rem',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)'
      }}>
        {/* Subtle Pitch Grid Pattern */}
        <div 
          className="court-grid-pattern"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.3,
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                fontSize: '0.7rem',
                fontWeight: 900,
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                letterSpacing: '0.12em',
                fontFamily: 'Space Mono, monospace'
              }}>
                NEXT FIXTURE
              </span>
              <span className="font-mono-ui" style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>
                {nextMatch?.sport} · {nextMatch?.matchType}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--primary))', fontSize: '0.8rem', fontWeight: 700 }}>
              <Clock size={15} />
              <span>Kickoff: {nextMatch?.time} IST</span>
            </div>
          </div>

          {/* Duel Display */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1.5rem 0',
            borderTop: '1px solid hsl(var(--border) / 0.6)',
            borderBottom: '1px solid hsl(var(--border) / 0.6)',
          }}>
            <div style={{ flex: '1 1 200px' }}>
              <span className="font-mono-ui" style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>
                Home Side
              </span>
              <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '0.2rem' }}>
                {nextMatch?.challenger}
              </h3>
            </div>

            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              backgroundColor: 'hsl(var(--secondary))',
              border: '2px solid hsl(var(--border))',
              display: 'grid',
              placeItems: 'center',
              color: 'hsl(var(--primary))',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: '1.15rem'
            }}>
              VS
            </div>

            <div style={{ flex: '1 1 200px', textAlign: 'right' }}>
              <span className="font-mono-ui" style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>
                Visiting Rival
              </span>
              <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '0.2rem' }}>
                {nextMatch?.opponent}
              </h3>
            </div>
          </div>

          {/* Bottom venue & booking details */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--foreground))' }}>
                <MapPin size={16} style={{ color: 'hsl(var(--primary))' }} />
                <span>{nextMatch?.venue}, Kurnool</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--muted-foreground))' }}>
                <Calendar size={16} style={{ color: 'hsl(var(--primary))' }} />
                <span>{nextMatch?.date}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setSelectedVenueId(4); // Aarohi Pickle Ball or venue id
                  setCurrentView('venues');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'hsl(var(--secondary))',
                  border: '1px solid hsl(var(--border))',
                  color: 'inherit',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <MapPin size={14} style={{ color: 'hsl(var(--primary))' }} />
                <span>Locate Ground on Map</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Split Columns: Featured Tournament & Live Inbox */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        {/* Featured Tournament */}
        <div style={{
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.75rem',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <span className="font-mono-ui" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(var(--primary))', fontWeight: 800 }}>
                  Featured Tournament
                </span>
                <h3 className="font-display" style={{ fontSize: '1.65rem', fontWeight: 900, marginTop: '0.2rem' }}>
                  {featuredTournament?.name}
                </h3>
              </div>
              <Trophy size={28} style={{ color: 'hsl(var(--primary))' }} />
            </div>

            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem' }}>
              {featuredTournament?.sport} · {featuredTournament?.format} · Hosted at {featuredTournament?.venue}
            </p>

            {/* Capacity Meter */}
            <div style={{
              backgroundColor: 'hsl(var(--muted) / 0.5)',
              borderRadius: '1rem',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <span style={{ color: 'hsl(var(--muted-foreground))' }}>Registration Progress</span>
                <span className="font-mono-ui" style={{ color: 'hsl(var(--primary))' }}>
                  {featuredTournament?.teamsRegistered} / {featuredTournament?.maxTeams} Teams
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'hsl(var(--background))', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{
                  width: `${(featuredTournament?.teamsRegistered / featuredTournament?.maxTeams) * 100}%`,
                  height: '100%',
                  backgroundColor: 'hsl(var(--primary))',
                  borderRadius: '9999px',
                  boxShadow: '0 0 12px var(--primary-glow)'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.85rem', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                <span>Fee: <strong style={{ color: 'hsl(var(--foreground))' }}>{featuredTournament?.entryFee === 0 ? 'Free' : `₹${featuredTournament?.entryFee}`}</strong></span>
                <span>Deadline: <strong style={{ color: 'hsl(var(--foreground))' }}>{featuredTournament?.registrationCloses}</strong></span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setCurrentView('tournaments')}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: 'transparent',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.75rem',
                color: 'inherit',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Browse All
            </button>

            <button
              onClick={() => setRegisterTournamentModal(featuredTournament)}
              style={{
                flex: 1.3,
                padding: '0.75rem',
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 0 20px -3px var(--primary-glow)'
              }}
            >
              Register Team
            </button>
          </div>
        </div>

        {/* Live Inbox */}
        <div style={{
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.75rem',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <span className="font-mono-ui" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(var(--primary))', fontWeight: 800 }}>
                  Live Inbox
                </span>
                <h3 className="font-display" style={{ fontSize: '1.65rem', fontWeight: 900, marginTop: '0.2rem' }}>
                  Direct Challenges
                </h3>
              </div>
              <button
                onClick={() => setCurrentView('challenges')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'hsl(var(--primary))',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <span>View all</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentChallenges.map(c => (
                <div 
                  key={c.id}
                  style={{
                    backgroundColor: 'hsl(var(--muted) / 0.5)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    border: '1px solid hsl(var(--border) / 0.5)'
                  }}
                >
                  {(() => {
                    const isMine = c.ownerEmail === currentUser?.email || (!c.ownerEmail && c.challenger === currentUser?.team);
                    return (
                      <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="font-display" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                      {c.challenger} <span style={{ color: 'hsl(var(--primary))', fontSize: '0.85rem' }}>vs</span> {c.opponent || 'Open Challenge'}
                    </span>
                    <span style={{
                      fontSize: '0.65rem',
                      fontFamily: 'Space Mono, monospace',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '9999px',
                      backgroundColor: isMine ? 'hsl(var(--secondary))' : c.status === 'pending' ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--card))',
                      color: isMine ? 'hsl(var(--primary))' : c.status === 'pending' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                      fontWeight: 800,
                      textTransform: 'uppercase'
                    }}>
                      {isMine ? 'Posted' : c.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                    <span>{c.sport} · {c.venue}</span>
                    <span>{c.date} @ {c.time}</span>
                  </div>

                  {!isMine && c.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                      <button
                        onClick={() => updateChallengeStatus(c.id, 'accepted')}
                        style={{
                          flex: 1,
                          padding: '0.4rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'hsl(var(--primary))',
                          color: 'hsl(var(--primary-foreground))',
                          border: 'none',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <Check size={14} strokeWidth={3} />
                        <span>Accept Fixture</span>
                      </button>
                      <button
                        onClick={() => updateChallengeStatus(c.id, 'rejected')}
                        style={{
                          padding: '0.4rem 0.75rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'transparent',
                          color: 'hsl(var(--muted-foreground))',
                          border: '1px solid hsl(var(--border))',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                      </>
                    );
                  })()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
