import React, { useState } from 'react';
import { 
  Home, 
  Trophy, 
  Swords, 
  MapPin, 
  User, 
  Plus, 
  Menu, 
  X, 
  LogOut,
  Zap
} from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function Navigation() {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    logout,
    setIsSendChallengeOpen,
    challenges 
  } = useGameSet();

  const [menuOpen, setMenuOpen] = useState(false);
  const pendingChallengesCount = challenges.filter(c => c.status === 'pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'challenges', label: 'Challenges', icon: Swords, badge: pendingChallengesCount },
    { id: 'venues', label: 'Grounds & Map', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: '#0a0f1d', /* Solid, non-transparent */
        borderBottom: '1px solid hsl(var(--border))',
        padding: '0 1.5rem',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Left Side: Menu Toggle Button + Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Menu Button on the LEFT side */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            title="Toggle Menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              backgroundColor: menuOpen ? 'hsl(var(--secondary))' : 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
              color: 'hsl(var(--foreground))',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease, border-color 0.15s ease',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <button 
            onClick={() => setCurrentView('dashboard')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: 'inherit',
              padding: 0
            }}
          >
            <div style={{
              width: '2.4rem',
              height: '2.4rem',
              borderRadius: '0.75rem',
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 0 20px -2px var(--primary-glow)'
            }}>
              <Zap size={18} strokeWidth={2.8} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <span className="font-display" style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>
                GameSet
              </span>
              <span className="font-mono-ui" style={{ display: 'block', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(var(--primary))', marginTop: '0.15rem' }}>
                Competition Desk
              </span>
            </div>
          </button>

          {/* Live Venue Status Beacon */}
          <div 
            style={{ display: 'none', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }} 
            className="md:flex"
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '9999px',
              padding: '0.25rem 0.75rem',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.7rem',
              color: 'hsl(var(--muted-foreground))'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--accent))',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)'
              }} />
              <span>KURNOOL · 7 GROUNDS</span>
            </span>
          </div>
        </div>

        {/* Center Nav Items (Desktop Horizontal Pill Bar) */}
        <nav 
          style={{ display: 'none', alignItems: 'center', gap: '0.35rem', backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '9999px', padding: '0.3rem' }}
          className="lg:flex"
        >
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: active ? 'hsl(var(--primary))' : 'transparent',
                  color: active ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  boxShadow: active ? '0 0 16px -2px var(--primary-glow)' : 'none'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{
                    backgroundColor: active ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))',
                    color: active ? 'hsl(var(--primary))' : 'hsl(var(--primary-foreground))',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    padding: '0.1rem 0.45rem',
                    borderRadius: '9999px',
                    fontFamily: 'Space Mono, monospace'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Challenge CTA & Profile Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={() => setIsSendChallengeOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              border: 'none',
              borderRadius: '0.75rem',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 0 18px -3px var(--primary-glow)'
            }}
          >
            <Plus size={16} strokeWidth={3} />
            <span>Challenge</span>
          </button>

          {/* Profile Button in Menu */}
          <button
            onClick={() => setCurrentView('profile')}
            title="Open Profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: currentView === 'profile' ? 'hsl(var(--secondary))' : 'hsl(var(--card))',
              border: currentView === 'profile' ? '1px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
              padding: '0.35rem 0.75rem',
              cursor: 'pointer',
              color: 'inherit',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '1.9rem',
              height: '1.9rem',
              borderRadius: '0.5rem',
              backgroundColor: 'hsl(var(--primary) / 0.15)',
              color: 'hsl(var(--primary))',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: '0.8rem'
            }}>
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
            </div>
            <span className="hidden sm:inline" style={{ fontSize: '0.825rem', fontWeight: 700 }}>
              {currentUser?.name ? currentUser.name.split(' ')[0] : 'Profile'}
            </span>
          </button>
        </div>
      </header>

      {/* 1/4th Vertical Left Drawer (Solid, Non-Transparent) */}
      {menuOpen && (
        <>
          {/* Subtle click-outside backdrop overlay */}
          <div 
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
            }}
          />

          {/* Solid 1/4th Screen Vertical Drawer */}
          <aside 
            className="animate-rise"
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              zIndex: 100,
              /* Covers exactly 1/4th of the page on desktops/laptops, with responsive boundaries */
              width: 'clamp(270px, 25vw, 340px)',
              height: '100vh',
              backgroundColor: '#0e1626', /* 100% solid, non-transparent */
              borderRight: '1px solid hsl(var(--border))',
              boxShadow: '15px 0 45px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
            }}
          >
            {/* Drawer Top Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid hsl(var(--border))',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.2rem',
                  height: '2.2rem',
                  borderRadius: '0.65rem',
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900
                }}>
                  <Zap size={16} strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 900, lineHeight: 1 }}>
                    GameSet
                  </h3>
                  <span className="font-mono-ui" style={{ fontSize: '0.625rem', color: 'hsl(var(--primary))', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    Menu
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'hsl(var(--muted-foreground))',
                  cursor: 'pointer',
                  padding: '0.35rem',
                  borderRadius: '0.5rem',
                  display: 'grid',
                  placeItems: 'center'
                }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Items List */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              {navItems.map(item => {
                const Icon = item.icon;
                const active = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.85rem 1rem',
                      borderRadius: '0.85rem',
                      border: 'none',
                      backgroundColor: active ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                      color: active ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                      fontSize: '0.925rem',
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: active ? '0 0 16px -2px var(--primary-glow)' : 'none'
                    }}
                  >
                    <Icon size={18} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge > 0 && (
                      <span style={{
                        backgroundColor: active ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))',
                        color: active ? 'hsl(var(--primary))' : 'hsl(var(--primary-foreground))',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        fontFamily: 'Space Mono, monospace'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom User Profile Card & Sign Out */}
            <div style={{
              borderTop: '1px solid hsl(var(--border))',
              paddingTop: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div 
                onClick={() => {
                  setCurrentView('profile');
                  setMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: 'hsl(var(--card))',
                  padding: '0.75rem',
                  borderRadius: '0.85rem',
                  cursor: 'pointer',
                  border: '1px solid hsl(var(--border))'
                }}
              >
                <div style={{
                  width: '2.4rem',
                  height: '2.4rem',
                  borderRadius: '0.65rem',
                  backgroundColor: 'hsl(var(--primary) / 0.15)',
                  color: 'hsl(var(--primary))',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                  fontSize: '0.9rem'
                }}>
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
                </div>
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentUser?.name}
                  </p>
                  <p className="font-mono-ui" style={{ fontSize: '0.65rem', color: 'hsl(var(--primary))' }}>
                    {currentUser?.team}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  backgroundColor: 'hsl(var(--destructive) / 0.15)',
                  color: 'hsl(var(--destructive))',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
