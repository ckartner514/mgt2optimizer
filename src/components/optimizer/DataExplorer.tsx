import { genreCombos } from "@/data/genreCombos";

export default function DataExplorer() {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="text-2xl font-semibold text-white">All Data</h2>
      <p className="mt-2 text-sm text-neutral-400">
        Quick overview of the currently loaded genre combo data.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400">
              <th className="px-3 py-3">Genre</th>
              <th className="px-3 py-3">Genre 2</th>
              <th className="px-3 py-3">Target Groups</th>
              <th className="px-3 py-3">Priority</th>
              <th className="px-3 py-3">Direction</th>
            </tr>
          </thead>
          <tbody>
            {genreCombos.map((row, index) => (
              <tr
                key={`${row.genre}-${row.genre2}-${index}`}
                className="border-b border-neutral-800/70"
              >
                <td className="px-3 py-3 text-white">{row.genre}</td>
                <td className="px-3 py-3 text-neutral-300">{row.genre2 ?? "-"}</td>
                <td className="px-3 py-3 text-neutral-300">
                  {row.targetGroups.join(", ")}
                </td>
                <td className="px-3 py-3 text-neutral-300">
                  {row.designPriority.join(" / ")}
                </td>
                <td className="px-3 py-3 text-neutral-300">
                  {row.designDirection.join(" / ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}