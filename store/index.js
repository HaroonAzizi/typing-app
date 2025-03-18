// store/index.js
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  text: "",
  userInput: "",
  timer: 30, // Default timer value
  timeLeft: 30, // Initialize timeLeft to match timer
  status: "idle", // 'idle', 'running', 'finished'
  wordsPerMinute: 0,
  accuracy: 0,
};

export const { useGlobalState } = createGlobalState(initialState);
