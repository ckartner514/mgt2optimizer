export const genreColors: Record<string, string> = {
  "Action": "bg-blue-500/20 text-blue-300 border-blue-400/30",
  "Adventure": "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
  "Building Game": "bg-orange-500/20 text-orange-300 border-orange-400/30",
  "Puzzle Game": "bg-pink-500/20 text-pink-300 border-pink-400/30",
  "Real-Time Strategy": "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
  "First-Person Shooter": "bg-red-500/20 text-red-300 border-red-400/30",
  "Skill Game": "bg-indigo-500/20 text-indigo-300 border-indigo-400/30",
  "Interactive Movie": "bg-purple-500/20 text-purple-300 border-purple-400/30",
  "Fighting Game": "bg-rose-500/20 text-rose-300 border-rose-400/30",
  "Platformer": "bg-lime-500/20 text-lime-300 border-lime-400/30",
  "Racing": "bg-teal-500/20 text-teal-300 border-teal-400/30",
  "Role-Playing Game": "bg-violet-500/20 text-violet-300 border-violet-400/30",
  "Simulation": "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  "Sports Game": "bg-green-500/20 text-green-300 border-green-400/30",
  "Strategy": "bg-amber-500/20 text-amber-300 border-amber-400/30",
  "Third-Person Shooter": "bg-red-600/20 text-red-400 border-red-500/30",
  "Visual Novel": "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30",
  "Economic Simulation": "bg-sky-500/20 text-sky-300 border-sky-400/30",
  "Survival Game": "bg-gray-500/20 text-gray-300 border-gray-400/30",
};

export function getGenreColor(genre: string) {
  return genreColors[genre] || "bg-neutral-700 text-neutral-300 border-neutral-600";
}
