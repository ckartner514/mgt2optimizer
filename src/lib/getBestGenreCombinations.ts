import { genreCombos } from "@/data/genreCombos";
import type { GenreCombo } from "@/lib/types";

export function getBestGenreCombinations(combo: GenreCombo): string[] {
  const baseCombo = genreCombos.find(
    (item) => item.genre === combo.genre && item.genre2 === null
  );

  return baseCombo?.subGenres ?? combo.subGenres ?? [];
}