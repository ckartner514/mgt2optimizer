import type { GenreCombo } from "@/lib/types";

const universalPrefixes = [
  "Nova",
  "Echo",
  "Iron",
  "Shadow",
  "Crystal",
  "Neon",
  "Silent",
  "Storm",
  "Ember",
  "Pixel",
  "Turbo",
  "Solar",
  "Midnight",
  "Phantom",
  "Golden",
  "Wild",
  "Arcane",
  "Quantum",
  "Cyber",
  "Rogue",
];

const universalNouns = [
  "Legacy",
  "Frontier",
  "Horizon",
  "Empire",
  "World",
  "Realm",
  "Quest",
  "Arena",
  "Odyssey",
  "Saga",
  "Chronicles",
  "Protocol",
  "Rivals",
  "Legends",
  "Outpost",
  "Kingdom",
  "Circuit",
  "Dynasty",
  "Project",
  "Dreams",
];

const endings = [
  "Origins",
  "Legacy",
  "Reborn",
  "Ascension",
  "Awakening",
  "Eclipse",
  "Genesis",
  "Reckoning",
  "Evolution",
  "Infinity",
  "Chronicles",
  "Saga",
  "Zero",
  "Beyond",
  "Ultimate",
  "Reloaded",
  "Remastered",
  "Frontiers",
  "Aftermath",
  "Rising",
];

const genrePools: Record<string, string[]> = {
  Action: [
    "Strike",
    "Assault",
    "Blitz",
    "Vanguard",
    "Rage",
    "Impact",
    "Rush",
    "Havoc",
    "Rebellion",
    "Vendetta",
  ],
  Adventure: [
    "Journey",
    "Quest",
    "Expedition",
    "Mystery",
    "Voyage",
    "Relic",
    "Path",
    "Treasure",
    "Islands",
    "Echoes",
  ],
  "Role-Playing Game": [
    "Kingdom",
    "Crown",
    "Dragon",
    "Wyrm",
    "Runes",
    "Realms",
    "Guild",
    "Prophecy",
    "Dungeon",
    "Legends",
  ],
  "First-Person Shooter": [
    "Protocol",
    "Ops",
    "Frontline",
    "Warzone",
    "Strike",
    "Tactical",
    "Breach",
    "Squad",
    "Crossfire",
    "Extraction",
  ],
  "Third-Person Shooter": [
    "Mercs",
    "Outbreak",
    "Rebellion",
    "Havoc",
    "Cover",
    "Vendetta",
    "Rogue",
    "Pursuit",
    "Lockdown",
    "Renegades",
  ],
  "Building Game": [
    "Blueprint",
    "Foundations",
    "Workshop",
    "Colony",
    "Builder",
    "Craft",
    "Factory",
    "Blocks",
    "Village",
    "Settlement",
  ],
  "Puzzle Game": [
    "Cipher",
    "Enigma",
    "Mindlock",
    "Pattern",
    "Fragments",
    "Logic",
    "Tiles",
    "Grid",
    "Riddle",
    "Sequence",
  ],
  "Real-Time Strategy": [
    "Command",
    "Dominion",
    "Conquest",
    "Empire",
    "Tactics",
    "Warlords",
    "Stronghold",
    "Alliance",
    "Front",
    "Legion",
  ],
  Simulation: [
    "Simulator",
    "Tycoon",
    "Manager",
    "Life",
    "World",
    "Studio",
    "Workshop",
    "Factory",
    "Empire",
    "Business",
  ],
  Sports: [
    "League",
    "Arena",
    "Champions",
    "Rivals",
    "Season",
    "Cup",
    "Club",
    "Matchday",
    "Dynasty",
    "Finals",
  ],
  Racing: [
    "Drift",
    "Velocity",
    "Circuit",
    "Nitro",
    "Rally",
    "Turbo",
    "Asphalt",
    "Overdrive",
    "Apex",
    "Grand Prix",
  ],
  Platformer: [
    "Jump",
    "Dash",
    "Run",
    "Islands",
    "World",
    "Castle",
    "Stars",
    "Clouds",
    "Lands",
    "Adventure",
  ],
  Horror: [
    "Nightfall",
    "Shadows",
    "Haunting",
    "Darkness",
    "Hollow",
    "Fear",
    "Mansion",
    "Whispers",
    "Nightmare",
    "Ritual",
  ],
  "Survival Game": [
    "Wasteland",
    "Outpost",
    "Shelter",
    "Last Stand",
    "Wilds",
    "Haven",
    "Ruins",
    "Aftermath",
    "Colony",
    "Frontier",
  ],
};

const targetToneWords: Record<string, string[]> = {
  Children: [
    "Tiny",
    "Happy",
    "Magic",
    "Little",
    "Super",
    "Sunny",
    "Candy",
    "Jolly",
    "Mini",
    "Rainbow",
  ],
  Teenagers: [
    "Neon",
    "Shadow",
    "Turbo",
    "Rogue",
    "Wild",
    "Cyber",
    "Chaos",
    "Blaze",
    "Zero",
    "Rebel",
  ],
  Adults: [
    "Iron",
    "Broken",
    "Silent",
    "Crimson",
    "Final",
    "Black",
    "Fallen",
    "Cold",
    "Prime",
    "Dark",
  ],
  Seniors: [
    "Classic",
    "Golden",
    "Calm",
    "Legacy",
    "Timeless",
    "Royal",
    "Heritage",
    "Noble",
    "Grand",
    "Peaceful",
  ],
};

function hashString(value: string): number {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }

  return hash >>> 0;
}

function createRandom(seed: number) {
  let state = seed || 1;

  return function random() {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function pick<T>(items: T[], random: () => number): T {
  return items[Math.floor(random() * items.length)];
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function normalizeName(name: string) {
  return name
    .replace(/\s+/g, " ")
    .replace(/\b(\w+)\s+\1\b/gi, "$1")
    .trim();
}

function isValidName(name: string) {
  const words = name.split(" ");

  if (words.length > 5) return false;
  if (name.length < 6 || name.length > 42) return false;
  if (/Simulator Simulator/i.test(name)) return false;
  if (/Tycoon Tycoon/i.test(name)) return false;
  if (/Legacy Legacy/i.test(name)) return false;
  if (/Chronicles Chronicles/i.test(name)) return false;
  if (/World World/i.test(name)) return false;

  return true;
}

export function generateGameNames(
  combo: GenreCombo,
  amount = 8,
  refreshKey = 0
): string[] {
  const seedBase = [
    combo.genre,
    combo.genre2,
    combo.subGenres.join("-"),
    combo.targetGroups.join("-"),
    refreshKey,
  ].join("|");

  const random = createRandom(hashString(seedBase));

  const genreWords = unique([
    ...(genrePools[combo.genre] ?? []),
    ...(combo.genre2 ? genrePools[combo.genre2] ?? [] : []),
    ...combo.subGenres.flatMap((sub) => genrePools[sub] ?? []),
    ...universalNouns,
  ]);

  const toneWords = unique([
    ...combo.targetGroups.flatMap((group) => targetToneWords[group] ?? []),
    ...universalPrefixes,
  ]);

  const patterns = [
    () => `${pick(toneWords, random)} ${pick(genreWords, random)}`,
    () => `${pick(genreWords, random)} ${pick(endings, random)}`,
    () =>
      `${pick(toneWords, random)} ${pick(genreWords, random)} ${pick(
        endings,
        random
      )}`,
    () => `${pick(genreWords, random)} of ${pick(toneWords, random)}`,
    () => `The ${pick(toneWords, random)} ${pick(genreWords, random)}`,
    () =>
      `${pick(toneWords, random)} ${pick(genreWords, random)}: ${pick(
        endings,
        random
      )}`,
    () => `${pick(genreWords, random)} ${pick(genreWords, random)}`,
    () => `${pick(toneWords, random)} ${pick(universalNouns, random)}`,
  ];

  const names = new Set<string>();
  let attempts = 0;

  while (names.size < amount && attempts < amount * 20) {
    attempts += 1;

    const name = normalizeName(pick(patterns, random)());

    if (isValidName(name)) {
      names.add(name);
    }
  }

  return Array.from(names);
}