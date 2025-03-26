// store/index.js
import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  timer: 15, // Changed from 30 to 15 for default value
  timeLeft: 15, // Changed from 30 to 15
  status: 'idle',
  text: '',
  userInput: '',
  wordsPerMinute: 0,
  accuracy: 0,
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };