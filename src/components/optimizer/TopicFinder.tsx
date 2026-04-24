"use client";

import { useMemo, useState } from "react";
import { genreTopics } from "@/data/genreTopics";

const TOP_COUNT = 20;

type Props = {
  selectedGenre: string;
};

export default function TopicFinder({ selectedGenre }: Props) {
  const genres = useMemo(() => {
    return genreTopics.map((item) => item.genre).sort();
  }, []);

  const genre = selectedGenre || genres[0] || "";

  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const current = useMemo(() => {
    return genreTopics.find((item) => item.genre === genre) ?? null;
  }, [genre]);

  const filteredTopics = useMemo(() => {
    const topics = current?.topics ?? [];

    if (!search.trim()) return topics;

    return topics.filter((topic) =>
      topic.toLowerCase().includes(search.toLowerCase())
    );
  }, [current, search]);

  const displayedTopics = showAll
    ? filteredTopics
    : filteredTopics.slice(0, TOP_COUNT);

  const remainingCount = Math.max(filteredTopics.length - TOP_COUNT, 0);

  return (
    <section className="rounded-2xl bg-neutral-900/80 p-6 backdrop-blur border border-neutral-800 shadow-lg shadow-emerald-500/10">
      
      {/* Accent bar */}
      <div className="mb-5 h-1 w-12 rounded bg-gradient-to-r from-emerald-500 to-green-400" />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="mb-1 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-2xl font-semibold text-transparent">
            Best Topics
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Top matching themes for the selected main genre.
          </p>
        </div>

        {current && (
          <p className="text-sm text-neutral-500">
            {filteredTopics.length} matching topics
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        
        {/* Genre (disabled) */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-200">
            Selected Genre
          </label>
          <select
            value={genre}
            disabled
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white opacity-70 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-200">
            Search topic
          </label>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowAll(true);
              setSelectedTopic(null);
            }}
            placeholder="Search zombies, cars, fantasy..."
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none placeholder:text-neutral-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
        
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Recommended topics
          </h3>

          {!showAll && remainingCount > 0 && (
            <span className="text-xs text-neutral-500">
              Showing top {TOP_COUNT}
            </span>
          )}
        </div>

        {displayedTopics.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {displayedTopics.map((topic, index) => {
              const isSelected = selectedTopic === topic;
              const isTopPick = !search && index < 6;

              return (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={[
                    "rounded-full border px-3 py-1.5 text-sm transition",
                    isSelected
                      ? "border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-500/30"
                      : isTopPick
                      ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
                      : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:bg-neutral-800",
                  ].join(" ")}
                >
                  {isTopPick && "★ "}
                  {topic}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">
            No topic found for this search.
          </p>
        )}

        {remainingCount > 0 && !search && (
          <div className="mt-5">
            <button
              onClick={() => setShowAll((value) => !value)}
              className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-200 transition hover:bg-neutral-800"
            >
              {showAll
                ? "Show fewer topics"
                : `Show all ${filteredTopics.length} topics`}
            </button>
          </div>
        )}

        {selectedTopic && (
          <div className="mt-5 rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-4 text-sm text-emerald-100">
            Selected topic:{" "}
            <span className="font-semibold">{selectedTopic}</span>
          </div>
        )}
      </div>
    </section>
  );
}