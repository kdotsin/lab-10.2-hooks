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

  // Simulated API call: runs only when the debounced value changes
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
    <section>
      <h2>Debounce Search Demo</h2>

      <label>
        Debounce delay (ms):{" "}
        <input
          type="number"
          min={0}
          step={100}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </label>

      <div>
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <p><strong>Current input:</strong> {input}</p>
      <p><strong>Debounced value (after {delay}ms):</strong> {debouncedValue}</p>

      <h3>Simulated search results</h3>
      {debouncedValue === "" && <p>Type to see results.</p>}
      {debouncedValue !== "" && results.length === 0 && <p>No matches.</p>}
      <ul>
        {results.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </section>
  );
}