import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TOURNAMENTS, INITIAL_CHALLENGES, INITIAL_VENUES } from '../data/initialData';

const GameSetContext = createContext(null);

export function GameSetProvider({ children }) {
  // Auth state - starts on login page when first visiting
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('gameset_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gameset_user');
    return saved ? JSON.parse(saved) : {
      name: 'Rahul Varma',
      team: 'Kurnool Strikers',
      email: 'rahul@gameset.io',
      role: 'Team Captain',
      city: 'Kurnool',
      matchesPlayed: 14,
      wins: 11,
      winRate: '78%'
    };
  });

  const login = (userData) => {
    const user = userData || currentUser;
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('gameset_auth', 'true');
    localStorage.setItem('gameset_user', JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('gameset_auth');
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('gameset_user', JSON.stringify(updated));
      return updated;
    });
  };

  // Navigation state: 'dashboard', 'tournaments', 'challenges', 'venues', 'profile'
  const [currentView, setCurrentView] = useState('dashboard');

  // Tournaments state
  const [tournaments, setTournaments] = useState(() => {
    const saved = localStorage.getItem('gameset_tournaments');
    return saved ? JSON.parse(saved) : INITIAL_TOURNAMENTS;
  });

  // Challenges state
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('gameset_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  // Venues state
  const [venues] = useState(INITIAL_VENUES);
  const [selectedVenueId, setSelectedVenueId] = useState(1);

  // Modals state
  const [isCreateTournamentOpen, setIsCreateTournamentOpen] = useState(false);
  const [isSendChallengeOpen, setIsSendChallengeOpen] = useState(false);
  const [registerTournamentModal, setRegisterTournamentModal] = useState(null);
  const [bookVenueModal, setBookVenueModal] = useState(null);

  // Persist tournaments
  useEffect(() => {
    localStorage.setItem('gameset_tournaments', JSON.stringify(tournaments));
  }, [tournaments]);

  // Persist challenges
  useEffect(() => {
    localStorage.setItem('gameset_challenges', JSON.stringify(challenges));
  }, [challenges]);

  // Actions
  const createTournament = (newTournament) => {
    const created = {
      ...newTournament,
      id: Date.now(),
      teamsRegistered: 1,
      status: 'Open',
      accent: 'emerald'
    };
    setTournaments(prev => [created, ...prev]);
  };

  const registerTeam = (tournamentId, teamName) => {
    setTournaments(prev => prev.map(t => {
      if (t.id === tournamentId && t.teamsRegistered < t.maxTeams) {
        return { ...t, teamsRegistered: t.teamsRegistered + 1 };
      }
      return t;
    }));
  };

  const sendChallenge = (newChallenge) => {
    const created = {
      ...newChallenge,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setChallenges(prev => [created, ...prev]);
  };

  const updateChallengeStatus = (id, newStatus) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  // Derived metrics
  const activeTournamentsCount = tournaments.filter(t => t.status === 'Open').length;
  const openChallengesCount = challenges.filter(c => c.status === 'pending').length;
  const upcomingMatchesCount = challenges.filter(c => c.status === 'accepted').length;
  const nextMatch = challenges.find(c => c.status === 'accepted') || challenges[0];
  const featuredTournament = tournaments[0];

  return (
    <GameSetContext.Provider value={{
      isAuthenticated,
      currentUser,
      login,
      logout,
      updateProfile,
      currentView,
      setCurrentView,
      tournaments,
      challenges,
      venues,
      selectedVenueId,
      setSelectedVenueId,
      createTournament,
      registerTeam,
      sendChallenge,
      updateChallengeStatus,
      isCreateTournamentOpen,
      setIsCreateTournamentOpen,
      isSendChallengeOpen,
      setIsSendChallengeOpen,
      registerTournamentModal,
      setRegisterTournamentModal,
      bookVenueModal,
      setBookVenueModal,
      metrics: {
        activeTournamentsCount,
        openChallengesCount,
        upcomingMatchesCount,
        nextMatch,
        featuredTournament
      }
    }}>
      {children}
    </GameSetContext.Provider>
  );
}

export function useGameSet() {
  const context = useContext(GameSetContext);
  if (!context) {
    throw new Error('useGameSet must be used within a GameSetProvider');
  }
  return context;
}
