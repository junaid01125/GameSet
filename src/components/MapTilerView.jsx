import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { MapPin, Navigation as NavIcon, Layers, Sparkles } from 'lucide-react';
import { useGameSet } from '../context/GameSetContext';

export function MapTilerView({ venues, selectedVenueId, onSelectVenue, onBookVenue }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || '4Pe60bgYnJjcUikKWtFO';

  // Choose map style based on active color panel
  const mapStyleUrl = `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: mapStyleUrl,
        center: [78.038, 15.832], // Kurnool Center
        zoom: 13,
        pitch: 25,
        attributionControl: false,
      });

      // Add navigation controls
      map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');
      map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

      map.on('load', () => {
        setMapLoaded(true);
      });

      map.on('error', (e) => {
        console.warn('MapLibre GL map notice:', e);
      });

      mapInstanceRef.current = map;

      return () => {
        map.remove();
      };
    } catch (err) {
      console.error('Failed to initialize map:', err);
      setMapError(true);
    }
  }, []);

  // Update / create venue markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    // Clear old markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    venues.forEach(venue => {
      // Create custom DOM marker element
      const el = document.createElement('div');
      el.className = 'custom-venue-pin';
      el.style.width = '38px';
      el.style.height = '38px';
      el.style.cursor = 'pointer';
      el.style.display = 'grid';
      el.style.placeItems = 'center';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid #ffffff';
      el.style.backgroundColor = venue.id === selectedVenueId ? 'hsl(var(--primary))' : 'hsl(var(--secondary))';
      el.style.color = venue.id === selectedVenueId ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))';
      el.style.boxShadow = venue.id === selectedVenueId 
        ? '0 0 20px 4px var(--primary-glow), 0 8px 16px rgba(0,0,0,0.5)' 
        : '0 4px 12px rgba(0,0,0,0.3)';
      el.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      el.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      `;

      // Popup Content
      const popupHtml = `
        <div style="font-family: 'DM Sans', sans-serif; min-width: 200px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: hsl(var(--primary));">
              ${venue.type}
            </span>
            <span style="font-size: 10px; opacity: 0.7; font-family: 'Space Mono', monospace;">
              ${venue.city}
            </span>
          </div>
          <h4 style="font-size: 15px; font-weight: 800; line-height: 1.2; margin-bottom: 4px;">
            ${venue.name}
          </h4>
          <p style="font-size: 12px; opacity: 0.8; margin-bottom: 8px;">
            ${venue.address}
          </p>
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
            <span style="font-size: 11px; font-weight: 700; color: hsl(var(--primary));">
              ${venue.priceLabel}
            </span>
            <span style="font-size: 10px; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">
              ${venue.availability}
            </span>
          </div>
        </div>
      `;

      const popup = new maplibregl.Popup({ offset: 25, closeButton: true })
        .setHTML(popupHtml);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([venue.longitude, venue.latitude])
        .setPopup(popup)
        .addTo(map);

      el.addEventListener('click', () => {
        onSelectVenue(venue.id);
      });

      markersRef.current[venue.id] = marker;
    });
  }, [venues, mapLoaded, selectedVenueId]);

  // Fly to selected venue
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedVenueId) return;

    const targetVenue = venues.find(v => v.id === selectedVenueId);
    if (targetVenue) {
      map.flyTo({
        center: [targetVenue.longitude, targetVenue.latitude],
        zoom: 14.5,
        essential: true,
        duration: 1200
      });

      const marker = markersRef.current[selectedVenueId];
      if (marker && mapLoaded) {
        marker.togglePopup();
      }
    }
  }, [selectedVenueId, mapLoaded]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '380px', borderRadius: '1.25rem', overflow: 'hidden' }}>
      {/* MapLibre Canvas Container */}
      <div 
        ref={mapContainerRef} 
        style={{ width: '100%', height: '100%', minHeight: '380px', backgroundColor: '#0e1626' }} 
      />

      {/* Map Header Overlay Pill */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 10,
        backgroundColor: 'hsl(var(--card) / 0.92)',
        backdropFilter: 'blur(10px)',
        border: '1px solid hsl(var(--border))',
        borderRadius: '0.85rem',
        padding: '0.5rem 0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '9999px',
          backgroundColor: 'hsl(var(--primary))',
          boxShadow: '0 0 10px var(--primary-glow)'
        }} />
        <span className="font-mono-ui" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
          MapTiler · Kurnool Approved Grounds
        </span>
      </div>

      {/* Bottom Center Reset View Button */}
      <button
        onClick={() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo({
              center: [78.038, 15.832],
              zoom: 13,
              pitch: 25,
              duration: 1000
            });
          }
        }}
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          zIndex: 10,
          backgroundColor: 'hsl(var(--card) / 0.9)',
          backdropFilter: 'blur(8px)',
          border: '1px solid hsl(var(--border))',
          borderRadius: '0.75rem',
          padding: '0.45rem 0.75rem',
          color: 'hsl(var(--foreground))',
          fontSize: '0.75rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
        }}
      >
        <NavIcon size={13} style={{ color: 'hsl(var(--primary))' }} />
        <span>Fit All Venues</span>
      </button>

      {/* Fallback Display if WebGL or offline */}
      {mapError && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#121a29',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <MapPin size={40} style={{ color: 'hsl(var(--primary))', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Kurnool Sports Grounds
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))', maxWidth: '340px' }}>
            Showing 7 approved local turfs and grounds across Kurnool city.
          </p>
        </div>
      )}
    </div>
  );
}
