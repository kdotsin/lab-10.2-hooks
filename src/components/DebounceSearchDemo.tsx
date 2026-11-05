import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

const FRUITS = [
  "Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Grape", "Grapefruit",
  "Lemon", "Mango", "Orange", "Papaya", "Peach", "Pear", "Pineapple", "Plum",
];

export function DebounceSearchDemo() {
  const [input, setInput] = useState("");
  const [delay, setDelay] = useState(500);
  const debouncedValue = useDebounce(input, delay);

  useEffect(() => {
    if (debouncedValue !== "") {
      console.log("Searching for:", debouncedValue);
    }
  }, [debouncedValue]);

  let results: string[] = [];
  if (debouncedValue !== "") {
    results = FRUITS.filter((fruit) =>
      fruit.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Debounce Search Demo</h2>

      <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        Debounce delay (ms):
        <input
          type="number"
          min={0}
          step={100}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-24 rounded-md border border-slate-300 px-2 py-1"
        />
      </label>

      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <div className="mt-4 space-y-1 rounded-md bg-slate-50 p-3 text-sm">
        <p>
          <span className="font-semibold text-slate-700">Current input:</span>{" "}
          <span className="text-slate-600">{input}</span>
          {input !== debouncedValue && (
            <span className="ml-2 text-xs text-amber-600">typing…</span>
          )}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Debounced value (after {delay}ms):</span>{" "}
          <span className="text-slate-600">{debouncedValue}</span>
        </p>
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-700">Simulated search results</h3>
      {debouncedValue === "" && <p className="mt-1 text-sm text-slate-500">Type to see results.</p>}
      {debouncedValue !== "" && results.length === 0 && (
        <p className="mt-1 text-sm text-slate-500">No matches.</p>
      )}
      <ul className="mt-1 flex flex-wrap gap-2">
        {results.map((fruit) => (
          <li key={fruit} className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
            {fruit}
          </li>
        ))}
      </ul>
    </section>
  );
}