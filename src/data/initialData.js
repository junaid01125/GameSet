export const INITIAL_TOURNAMENTS = [
  {
    id: 1,
    name: "Kurnool Monsoon Cup",
    sport: "Football",
    format: "5-a-side",
    venue: "Arena 24",
    date: "2026-09-26",
    registrationCloses: "2026-09-23",
    teamsRegistered: 10,
    maxTeams: 16,
    entryFee: 1500,
    status: "Open",
    organizer: "GameSet Kurnool",
    accent: "emerald"
  },
  {
    id: 2,
    name: "City Doubles Circuit",
    sport: "Pickleball",
    format: "Men's doubles",
    venue: "Aarohi Pickle Ball",
    date: "2026-10-03",
    registrationCloses: "2026-09-29",
    teamsRegistered: 7,
    maxTeams: 12,
    entryFee: 800,
    status: "Open",
    organizer: "Aarohi Pickle Ball",
    accent: "cyan"
  },
  {
    id: 3,
    name: "Ground Rules League",
    sport: "Cricket",
    format: "T20",
    venue: "Silver Jubilee College",
    date: "2026-10-10",
    registrationCloses: "2026-10-05",
    teamsRegistered: 6,
    maxTeams: 8,
    entryFee: 0,
    status: "Open",
    organizer: "GameSet Kurnool",
    accent: "amber"
  },
  {
    id: 4,
    name: "Night Owls 3v3 Hoopfest",
    sport: "Basketball",
    format: "3v3 Half-Court",
    venue: "Game On",
    date: "2026-10-17",
    registrationCloses: "2026-10-12",
    teamsRegistered: 8,
    maxTeams: 16,
    entryFee: 1000,
    status: "Open",
    organizer: "Kurnool Ballers Club",
    accent: "violet"
  }
];

export const INITIAL_CHALLENGES = [
  {
    id: 1,
    challenger: "Kurnool Strikers",
    opponent: "Nandyal United",
    sport: "Football",
    date: "2026-09-22",
    time: "18:30",
    venue: "PlayFit",
    matchType: "Competitive · Prize",
    status: "pending",
    createdAt: "2026-09-18T04:50:02.992Z"
  },
  {
    id: 2,
    challenger: "Riverbank Racquets",
    opponent: "Court Theory",
    sport: "Pickleball",
    date: "2026-09-24",
    time: "07:00",
    venue: "Aarohi Pickle Ball",
    matchType: "Friendly",
    status: "accepted",
    createdAt: "2026-09-18T04:50:02.992Z"
  },
  {
    id: 3,
    challenger: "Apex Smashers",
    opponent: "Shuttle Masters",
    sport: "Badminton",
    date: "2026-09-28",
    time: "19:00",
    venue: "Game On",
    matchType: "Ranked 1v1",
    status: "accepted",
    createdAt: "2026-09-18T05:20:00.000Z"
  }
];

export const INITIAL_VENUES = [
  {
    id: 1,
    name: "Arena 24",
    type: "Turf",
    address: "Kurnool city",
    city: "Kurnool",
    priceLabel: "Paid · ₹1,200 / hr",
    availability: "Open this weekend",
    latitude: 15.8308,
    longitude: 78.0425,
    lighting: "Floodlights 1500 Lux",
    surfaces: "FIFA Grade 5G Turf"
  },
  {
    id: 2,
    name: "PlayFit",
    type: "Turf",
    address: "Kurnool city",
    city: "Kurnool",
    priceLabel: "Paid · ₹900 / hr",
    availability: "2 slots today",
    latitude: 15.8176,
    longitude: 78.0418,
    lighting: "LED Stadium Glow",
    surfaces: "Multi-sport rubberized turf"
  },
  {
    id: 3,
    name: "Game On",
    type: "Turf",
    address: "Kurnool city",
    city: "Kurnool",
    priceLabel: "Paid · ₹1,000 / hr",
    availability: "Open this evening",
    latitude: 15.8441,
    longitude: 78.0354,
    lighting: "Standard Arena Lights",
    surfaces: "AstroTurf 4G"
  },
  {
    id: 4,
    name: "Aarohi Pickle Ball",
    type: "Turf",
    address: "Kurnool city",
    city: "Kurnool",
    priceLabel: "Paid · ₹700 / hr",
    availability: "Open tomorrow",
    latitude: 15.8245,
    longitude: 78.0506,
    lighting: "Non-glare court lighting",
    surfaces: "Cushioned acrylic court"
  },
  {
    id: 5,
    name: "STBC College",
    type: "Ground",
    address: "STBC College campus",
    city: "Kurnool",
    priceLabel: "Free / booking required",
    availability: "Request a slot",
    latitude: 15.8191,
    longitude: 78.0386,
    lighting: "Daylight only",
    surfaces: "Natural grass ground"
  },
  {
    id: 6,
    name: "St Joseph's Degree and PG College",
    type: "Ground",
    address: "St Joseph's Degree and PG College campus",
    city: "Kurnool",
    priceLabel: "Paid · ₹300 / hr",
    availability: "Request a slot",
    latitude: 15.8331,
    longitude: 78.0449,
    lighting: "Perimeter floodlights",
    surfaces: "Red clay & outfield"
  },
  {
    id: 7,
    name: "Silver Jubilee College",
    type: "Ground",
    address: "Silver Jubilee College campus",
    city: "Kurnool",
    priceLabel: "Free / booking required",
    availability: "Open this weekend",
    latitude: 15.8389,
    longitude: 78.0287,
    lighting: "Daylight only",
    surfaces: "Full cricket outfield"
  }
];
