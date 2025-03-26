// utils/textUtils.js

// Sample text passages for typing tests
const textSamples = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Pangrams are often used to test fonts, keyboards, and other text-related tools.",

  "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++.",

  "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.",

  "TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript.",

  "The World Wide Web, commonly known as the Web, is an information system enabling documents and other web resources to be accessed over the Internet. Documents and downloadable media are made available to the network through web servers and can be accessed by programs such as web browsers.",

  "Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.",

  "Cloud computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user. Large clouds often have functions distributed over multiple locations, each location being a data center.",

  "Software engineering is the systematic application of engineering approaches to the development of software. Software engineering is a computing discipline.",

  "A keyboard is a typewriter-style device which uses an arrangement of buttons or keys to act as mechanical levers or electronic switches. Keyboards are the primary devices used for inputting text.",

  "The Internet is a global system of interconnected computer networks that use the Internet protocol suite to communicate between networks and devices. It is a network of networks that consists of private, public, academic, business, and government networks of local to global scope, linked by a broad array of electronic, wireless, and optical networking technologies.",
];

// Function to get a random text sample
export const getRandomText = () => {
  const randomIndex = Math.floor(Math.random() * textSamples.length);
  return textSamples[randomIndex];
};

// Function to calculate typing statistics
export const calculateStats = (text, userInput, timeInSeconds) => {
  // Count correctly typed characters
  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (i < text.length && userInput[i] === text[i]) {
      correctChars++;
    }
  }

  // Calculate WPM: (characters / 5) / minutes
  const timeInMinutes = timeInSeconds / 60;
  const wpm = Math.round(correctChars / 5 / timeInMinutes);

  // Calculate accuracy
  const accuracy = Math.round(
    (correctChars / Math.max(1, userInput.length)) * 100
  );

  return { wpm, accuracy };
};
