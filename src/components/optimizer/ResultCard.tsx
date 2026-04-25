"use client";

import { useMemo, useState } from "react";
import type { GenreCombo } from "@/lib/types";
import { getGenreColor } from "@/lib/genreColors";
import { generateGameNames } from "@/lib/nameGenerator";
import { getBestGenreCombinations } from "@/lib/getBestGenreCombinations";

type Props = {
  combo: GenreCombo;
};

export default function ResultCard({ combo }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const bestGenreCombinations = getBestGenreCombinations(combo);

  const gameNames = useMemo(() => {
    return generateGameNames(combo, 8, refreshKey);
  }, [combo, refreshKey]);

  async function copyName(name: string) {
    await navigator.clipboard.writeText(name);
    setCopiedName(name);

    setTimeout(() => {
      setCopiedName(null);
    }, 1200);
  }

  async function copyAllNames() {
    await navigator.clipboard.writeText(gameNames.join("\n"));
    setCopiedName("all");

    setTimeout(() => {
      setCopiedName(null);
    }, 1200);
  }

  return (
    <div className="rounded-2xl bg-neutral-900/80 p-6 backdrop-blur border border-neutral-800 shadow-lg shadow-emerald-500/10">
      
      {/* GENRES */}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`border rounded-full px-3 py-1 text-xs font-medium ${getGenreColor(
            combo.genre
          )}`}
        >
          {combo.genre}
        </span>

        {combo.genre2 && (
          <span
            className={`border rounded-full px-3 py-1 text-xs font-medium ${getGenreColor(
              combo.genre2
            )}`}
          >
            {combo.genre2}
          </span>
        )}
      </div>

      {/* BEST GENRE COMBINATIONS */}
      {bestGenreCombinations.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 font-semibold text-white">
            Best Genre Combinations
          </p>
          <div className="flex flex-wrap gap-2">
            {bestGenreCombinations.map((genre) => (
              <span
                key={genre}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getGenreColor(
                  genre
                )}`}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="mt-6 space-y-6 text-sm text-neutral-200">
        
        {/* TARGET GROUPS */}
        <div>
          <p className="mb-2 font-semibold text-white">Target Groups</p>
          <div className="flex flex-wrap gap-2">
            {combo.targetGroups.map((group) => (
              <span
                key={group}
                className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-neutral-200"
              >
                {group}
              </span>
            ))}
          </div>
        </div>

        {/* DESIGN PRIORITY */}
        <div>
          <p className="mb-2 font-semibold text-white">Design Priority</p>
          <div className="flex flex-wrap gap-2">
            {combo.designPriority.map((value, i) => (
              <span
                key={i}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300"
              >
                {value}%
              </span>
            ))}
          </div>
        </div>

        {/* DESIGN FOCUS */}
        <div>
          <p className="mb-2 font-semibold text-white">Design Focus</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {combo.designFocus.map((value, index) => (
              <div
                key={index}
                className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 transition hover:border-emerald-500/30"
              >
                <p className="text-xs text-neutral-500">
                  Focus {index + 1}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DESIGN DIRECTION */}
        <div>
          <p className="mb-2 font-semibold text-white">Design Direction</p>
          <div className="flex flex-wrap gap-2">
            {combo.designDirection.map((value, i) => (
              <span
                key={i}
                className="rounded-full border border-emerald-400/30 bg-gradient-to-r from-emerald-500/20 to-green-500/20 px-3 py-1 text-xs text-emerald-200"
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        {/* GAME NAME GENERATOR */}
        <div className="rounded-2xl border border-emerald-500/20 bg-neutral-950/80 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-white">Game Name Ideas</p>
              <p className="mt-1 text-xs text-neutral-400">
                Context-aware names generated from this genre combo and target audience.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setRefreshKey((value) => value + 1)}
                className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-200 transition hover:border-emerald-500/40 hover:text-white"
              >
                Regenerate
              </button>

              <button
                type="button"
                onClick={copyAllNames}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"
              >
                {copiedName === "all" ? "Copied" : "Copy All"}
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {gameNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => copyName(name)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-left transition hover:border-emerald-500/40 hover:bg-neutral-800"
              >
                <span className="text-sm font-medium text-neutral-100">
                  {name}
                </span>

                <span className="shrink-0 text-xs text-neutral-500 group-hover:text-emerald-300">
                  {copiedName === name ? "Copied" : "Copy"}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}