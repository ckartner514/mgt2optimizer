"use client";

import { useMemo, useState, useEffect } from "react";
import { genreCombos } from "@/data/genreCombos";
import ResultCard from "./ResultCard";

type Props = {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
};

export default function GenreOptimizer({
  selectedGenre,
  onGenreChange,
}: Props) {
  const genres = useMemo(() => {
    return [...new Set(genreCombos.map((item) => item.genre))].sort();
  }, []);

  const genre = selectedGenre;
  const [genre2, setGenre2] = useState("__base__");

  useEffect(() => {
    if (genres.length > 0 && !genre) {
      onGenreChange(genres[0]);
    }
  }, [genres, genre, onGenreChange]);

  const combosForGenre = useMemo(() => {
    return genreCombos.filter((item) => item.genre === genre);
  }, [genre]);

  const secondaryGenres = useMemo(() => {
    return combosForGenre
      .filter((item) => item.genre2 !== null)
      .map((item) => item.genre2 as string)
      .sort();
  }, [combosForGenre]);

  const result = useMemo(() => {
    if (!genre) return null;

    if (genre2 === "__base__") {
      return combosForGenre.find((item) => item.genre2 === null) ?? null;
    }

    return combosForGenre.find((item) => item.genre2 === genre2) ?? null;
  }, [genre, genre2, combosForGenre]);

  return (
    <section className="rounded-2xl bg-neutral-900/80 p-6 backdrop-blur border border-neutral-800 shadow-lg shadow-emerald-500/10">
        <div className="mb-4 h-1 w-12 rounded bg-gradient-to-r from-emerald-500 to-green-400" />
      <h2 className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-2xl font-semibold text-transparent">
            Sub-Genre Optimizer
            </h2>
      <p className="mt-2 text-sm text-neutral-400">
        Pick a main genre and optional secondary genre to get the recommended setup.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-200">
            Main Genre
          </label>
          <select
            value={genre}
            onChange={(e) => {
              onGenreChange(e.target.value);
              setGenre2("__base__");
            }}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none"
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-200">
            Secondary Genre
          </label>
          <select
            value={genre2}
            onChange={(e) => setGenre2(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none"
          >
            <option value="__base__">Base / None</option>
            {secondaryGenres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        {result ? (
          <ResultCard combo={result} />
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-700 p-6 text-neutral-400">
            Select a main genre and a secondary genre to see the optimal setup.
          </div>
        )}
      </div>
    </section>
  );
}