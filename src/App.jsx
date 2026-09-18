import React from 'react';
import { useGameSet } from './context/GameSetContext';
import { Navigation } from './components/Navigation';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { TournamentsView } from './views/TournamentsView';
import { ChallengesView } from './views/ChallengesView';
import { VenuesView } from './views/VenuesView';
import { ProfileView } from './views/ProfileView';
import { CreateTournamentModal } from './components/CreateTournamentModal';
import { SendChallengeModal } from './components/SendChallengeModal';
import { RegisterTournamentModal } from './components/RegisterTournamentModal';
import { BookVenueModal } from './components/BookVenueModal';

function MainContent() {
  const { 
    isAuthenticated,
    currentView, 
    isCreateTournamentOpen, 
    setIsCreateTournamentOpen,
    isSendChallengeOpen,
    setIsSendChallengeOpen,
    registerTournamentModal,
    setRegisterTournamentModal,
    bookVenueModal,
    setBookVenueModal
  } = useGameSet();

  // If not signed in, show clean LoginView (Sign In & Create Account)
  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'tournaments':
        return <TournamentsView />;
      case 'challenges':
        return <ChallengesView />;
      case 'venues':
        return <VenuesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}>
      <Navigation />

      <main style={{ minHeight: 'calc(100vh - 70px)' }}>
        {renderView()}
      </main>

      {/* Clean Modals */}
      {isCreateTournamentOpen && (
        <CreateTournamentModal onClose={() => setIsCreateTournamentOpen(false)} />
      )}

      {isSendChallengeOpen && (
        <SendChallengeModal onClose={() => setIsSendChallengeOpen(false)} />
      )}

      {registerTournamentModal && (
        <RegisterTournamentModal 
          tournament={registerTournamentModal} 
          onClose={() => setRegisterTournamentModal(null)} 
        />
      )}

      {bookVenueModal && (
        <BookVenueModal 
          venue={bookVenueModal} 
          onClose={() => setBookVenueModal(null)} 
        />
      )}
    </div>
  );
}

export default function App() {
  return <MainContent />;
}
