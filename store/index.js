// store/index.js
import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  timer: 30, // Default timer value in seconds
  timeLeft: 30,
  status: 'idle', // idle, running, finished
  text: '',
  userInput: '',
  wordsPerMinute: 0,
  accuracy: 0,
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };