"use client";

import { useState } from "react";
import Header from "@/components/Header";
import GenreOptimizer from "@/components/optimizer/GenreOptimizer";
import TopicFinder from "@/components/optimizer/TopicFinder";

export default function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <GenreOptimizer
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />

        <TopicFinder selectedGenre={selectedGenre} />
      </div>
    </main>
  );
}