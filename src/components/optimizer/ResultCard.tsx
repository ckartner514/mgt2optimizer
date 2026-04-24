"use client";

import type { GenreCombo } from "@/lib/types";
import { getGenreColor } from "@/lib/genreColors";

type Props = {
  combo: GenreCombo;
};

export default function ResultCard({ combo }: Props) {
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

        {/* SUB GENRES */}
        {combo.subGenres.length > 0 && (
          <div>
            <p className="mb-2 font-semibold text-white">Sub-Genres</p>
            <div className="flex flex-wrap gap-2">
              {combo.subGenres.map((sub) => (
                <span
                  key={sub}
                  className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-neutral-300"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}

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
                className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 hover:border-emerald-500/30 transition"
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
      </div>
    </div>
  );
}