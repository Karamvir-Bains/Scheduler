import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  let newHistory = [...history];

  // Transitions to a new mode
  const transition = (newMode, replace = false) => {

    // On replace returns to initial mode
    if (replace) {
      while (newHistory.length > 1) {
        newHistory.pop();
      }
    }

    setMode(newMode);
    newHistory = [...newHistory, newMode];
    setHistory(newHistory);
  };

  // Goes back a mode from history
  const back = () => {
    // Prevents backing on initial mode
    if (newHistory.length <= 1) return;

    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };

  return { mode, transition, back };
}