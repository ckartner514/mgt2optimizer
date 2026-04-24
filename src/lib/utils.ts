import { genreCombos } from "@/data/genreCombos";

export function getUniqueGenres() {
  return [...new Set(genreCombos.map((item) => item.genre))].sort();
}

export function getAvailableSecondaryGenres(genre: string) {
  return genreCombos
    .filter((item) => item.genre === genre && item.genre2)
    .map((item) => item.genre2 as string)
    .sort();
}

export function findGenreCombo(genre: string, genre2: string | null) {
  return (
    genreCombos.find(
      (item) => item.genre === genre && (item.genre2 ?? null) === genre2
    ) ?? null
  );
}