import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TOURNAMENTS, INITIAL_VENUES } from '../data/initialData';
import { auth, database, signInAnonymously } from '../firebase';
import { onValue, push, ref, remove, set } from 'firebase/database';

const GameSetContext = createContext(null);

export function GameSetProvider({ children }) {
  // Auth state - starts on login page when first visiting
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('gameset_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gameset_user');
    return saved ? JSON.parse(saved) : {
      name: 'New Player',
      team: 'Fresh Squad',
      email: 'player@gameset.io',
      role: 'Player',
      city: 'Kurnool',
      matchesPlayed: 0,
      wins: 0,
      winRate: '0%'
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
    setCurrentUser({
      name: 'New Player',
      team: 'Fresh Squad',
      email: 'player@gameset.io',
      role: 'Player',
      city: 'Kurnool',
      matchesPlayed: 0,
      wins: 0,
      winRate: '0%'
    });
    localStorage.removeItem('gameset_auth');
    localStorage.removeItem('gameset_user');
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
    return saved ? JSON.parse(saved).filter(tournament => tournament.status !== 'cancelled') : INITIAL_TOURNAMENTS;
  });

  // Challenges state
  const [challenges, setChallenges] = useState(() => {
    if (localStorage.getItem('gameset_challenges_reset_v1') !== 'true') {
      localStorage.setItem('gameset_challenges_reset_v1', 'true');
      localStorage.removeItem('gameset_challenges');
      return [];
    }
    const saved = localStorage.getItem('gameset_challenges');
    return saved ? JSON.parse(saved).filter(challenge => challenge.status !== 'cancelled') : [];
  });

  // Venues state
  const [venues] = useState(INITIAL_VENUES);
  const [selectedVenueId, setSelectedVenueId] = useState(1);

  // Modals state
  const [isCreateTournamentOpen, setIsCreateTournamentOpen] = useState(false);
  const [isSendChallengeOpen, setIsSendChallengeOpen] = useState(false);
  const [registerTournamentModal, setRegisterTournamentModal] = useState(null);
  const [bookVenueModal, setBookVenueModal] = useState(null);
  const [refundNotice, setRefundNotice] = useState(null);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);

  useEffect(() => {
    let unsubscribeTournaments = () => {};
    let unsubscribeChallenges = () => {};

    signInAnonymously(auth)
      .then(() => {
        setCloudSyncEnabled(true);
        unsubscribeTournaments = onValue(ref(database, 'tournaments'), snapshot => {
          const remoteTournaments = snapshot.val();
          if (remoteTournaments) {
            setTournaments(Object.values(remoteTournaments).filter(tournament => tournament.status !== 'cancelled'));
          }
        });
        unsubscribeChallenges = onValue(ref(database, 'challenges'), snapshot => {
          const remoteChallenges = snapshot.val();
          setChallenges(remoteChallenges
            ? Object.values(remoteChallenges).filter(challenge => challenge.status !== 'cancelled')
            : []);
        });
      })
      .catch(error => {
        console.warn('Firebase sync unavailable; using local browser storage.', error);
      });

    return () => {
      unsubscribeTournaments();
      unsubscribeChallenges();
    };
  }, []);

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
      ownerEmail: currentUser?.email,
      id: Date.now(),
      teamsRegistered: 1,
      status: 'posted',
      accent: 'emerald'
    };
    setTournaments(prev => [created, ...prev]);
    if (cloudSyncEnabled) {
      set(ref(database, `tournaments/${created.id}`), created).catch(console.error);
    }
  };

  const registerTeam = (tournamentId, teamName) => {
    setTournaments(prev => prev.map(t => {
      if (t.id === tournamentId && t.teamsRegistered < t.maxTeams) {
        const updated = { ...t, teamsRegistered: t.teamsRegistered + 1 };
        if (cloudSyncEnabled) {
          set(ref(database, `tournaments/${tournamentId}`), updated).catch(console.error);
        }
        return updated;
      }
      return t;
    }));
  };

  const sendChallenge = (newChallenge) => {
    const created = {
      ...newChallenge,
      opponent: 'Open Challenge',
      ownerEmail: currentUser?.email,
      id: Date.now(),
      status: 'posted',
      createdAt: new Date().toISOString()
    };
    setChallenges(prev => [created, ...prev]);
    if (cloudSyncEnabled) {
      set(ref(database, `challenges/${created.id}`), created).catch(console.error);
    }
  };

  const updateChallengeStatus = (id, newStatus) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id) {
        const updated = { ...c, status: newStatus };
        if (cloudSyncEnabled) {
          set(ref(database, `challenges/${id}`), updated).catch(console.error);
        }
        return updated;
      }
      return c;
    }));
  };

  const cancelChallenge = (id, cancellationReason) => {
    setChallenges(prev => prev.filter(c => {
      if (c.id === id && c.ownerEmail === currentUser?.email && c.status === 'posted') {
        return false;
      }
      return c;
    }));
    if (cloudSyncEnabled) {
      remove(ref(database, `challenges/${id}`)).catch(console.error);
    }
  };

  const forfeitTournament = (id, cancellationReason, refundPlan) => {
    setTournaments(prev => prev.filter(t => {
      if (t.id === id && t.ownerEmail === currentUser?.email && t.status === 'posted') {
        setRefundNotice({ cancellationReason, refundPlan });
        return false;
      }
      return t;
    }));
    if (cloudSyncEnabled) {
      remove(ref(database, `tournaments/${id}`)).catch(console.error);
    }
  };

  // Derived metrics
  const activeTournamentsCount = tournaments.filter(t => t.status === 'Open').length;
  const openChallengesCount = challenges.filter(c => c.status === 'pending').length;
  const upcomingMatchesCount = challenges.filter(c => c.status === 'accepted').length;
  const nextMatch = challenges.find(c => c.status === 'accepted');
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
      cancelChallenge,
      forfeitTournament,
      isCreateTournamentOpen,
      setIsCreateTournamentOpen,
      isSendChallengeOpen,
      setIsSendChallengeOpen,
      registerTournamentModal,
      setRegisterTournamentModal,
      bookVenueModal,
      setBookVenueModal,
      refundNotice,
      setRefundNotice,
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
