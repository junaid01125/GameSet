import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Sparkles, 
  Clock, 
  Compass, 
  Check, 
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';
import { MapTilerView } from '../components/MapTilerView';

export function VenuesView() {
  const { 
    venues, 
    selectedVenueId, 
    setSelectedVenueId, 
    setBookVenueModal 
  } = useGameSet();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All'); // All, Turf, Ground

  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      const matchSearch = `${v.name} ${v.type} ${v.address} ${v.city}`.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'All' || v.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [venues, search, typeFilter]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <section className="animate-rise">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="font-mono-ui" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'hsl(var(--primary))' }}>
            Approved Places to Play
          </span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'hsl(var(--primary))' }} />
          <span className="font-mono-ui" style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))' }}>
            Kurnool Grounds Network
          </span>
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.05 }}>
          Find your ground.
        </h1>
        <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'hsl(var(--muted-foreground))', maxWidth: '540px' }}>
          Good turf. Clear details. Fewer excuses. Browse on MapTiler interactive map or book a slot directly.
        </p>
      </section>

      {/* Main Split Grid: Interactive Map + Venue List */}
      <section 
        className="animate-rise animate-rise-delay-1"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '1.75rem',
          overflow: 'hidden',
          minHeight: '680px'
        }}
      >
        {/* Left Side: Interactive Map */}
        <div style={{ minHeight: '440px', position: 'relative', height: '100%', padding: '0.5rem' }}>
          <MapTilerView 
            venues={venues}
            selectedVenueId={selectedVenueId}
            onSelectVenue={id => setSelectedVenueId(id)}
            onBookVenue={venue => setBookVenueModal(venue)}
          />
        </div>

        {/* Right Side: Venue Directory & Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid hsl(var(--border))' }}>
          {/* Search and Filters Header */}
          <div style={{ padding: '1.25rem', borderBottom: '1px solid hsl(var(--border))', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
              <input
                type="search"
                placeholder="Search grounds, turfs, colleges..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  paddingLeft: '2.5rem',
                  paddingRight: '0.75rem',
                  backgroundColor: 'hsl(var(--input))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            {/* Type Filters: All, Turf, Ground */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['All', 'Turf', 'Ground'].map(type => {
                const active = typeFilter === type;
                return (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '0.55rem',
                      border: active ? '1px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
                      backgroundColor: active ? 'hsl(var(--secondary))' : 'transparent',
                      color: active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {type}
                  </button>
                );
              })}
              <span className="font-mono-ui" style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))', alignSelf: 'center' }}>
                {filteredVenues.length} grounds
              </span>
            </div>
          </div>

          {/* Scrollable Venue Cards List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '580px' }}>
            {filteredVenues.map(v => {
              const isSelected = selectedVenueId === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVenueId(v.id)}
                  style={{
                    padding: '1.15rem',
                    borderRadius: '1rem',
                    backgroundColor: isSelected ? 'hsl(var(--secondary))' : 'hsl(var(--background) / 0.5)',
                    border: isSelected ? '1px solid hsl(var(--primary))' : '1px solid hsl(var(--border) / 0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                          {v.name}
                        </h3>
                        <MapPin size={14} style={{ color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }} />
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.15rem' }}>
                        {v.type} · {v.address}, {v.city}
                      </p>
                    </div>

                    <span style={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.45rem',
                      fontSize: '0.65rem',
                      fontFamily: 'Space Mono, monospace',
                      color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>
                      {v.type}
                    </span>
                  </div>

                  {/* Surface and lighting specs */}
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))' }}>
                    <span>⚡ {v.lighting}</span>
                    <span>•</span>
                    <span>🌱 {v.surfaces}</span>
                  </div>

                  {/* Price & Booking Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid hsl(var(--border) / 0.4)'
                  }}>
                    <div>
                      <span className="font-mono-ui" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'hsl(var(--primary))' }}>
                        {v.priceLabel}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.65rem', color: 'hsl(var(--muted-foreground))' }}>
                        {v.availability}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBookVenueModal(v);
                      }}
                      style={{
                        padding: '0.4rem 0.85rem',
                        backgroundColor: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                        color: isSelected ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                        border: isSelected ? 'none' : '1px solid hsl(var(--border))',
                        borderRadius: '0.6rem',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <span>Book Slot</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredVenues.length === 0 && (
              <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>
                <p style={{ fontSize: '0.9rem' }}>No grounds found matching "{search}"</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
