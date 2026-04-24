export type DesignFocus = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export type DesignDirection = [number, number, number];

export type DesignPriority = [number, number, number, number];

export type GenreCombo = {
  genre: string;
  genre2: string | null;
  targetGroups: string[];
  subGenres: string[];
  designPriority: DesignPriority;
  designFocus: DesignFocus;
  designDirection: DesignDirection;
};

export type GenreTopics = {
  genre: string;
  topics: string[];
};