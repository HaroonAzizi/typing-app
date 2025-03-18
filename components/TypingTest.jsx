// components/TypingTest.jsx - With corrected WPM calculation
"use client";

import React, { useEffect, useState, useRef } from "react";
import TimerSelector from "./TimerSelector";
import { useGlobalState } from "../store";
import { getRandomText } from "../utils/textUtils";

const TypingTest = () => {
  // Global state
  const [timer, setTimer] = useGlobalState("timer");
  const [status, setStatus] = useGlobalState("status");
  const [timeLeft, setTimeLeft] = useGlobalState("timeLeft");
  const [text, setText] = useGlobalState("text");
  const [userInput, setUserInput] = useGlobalState("userInput");
  const [wordsPerMinute, setWordsPerMinute] = useGlobalState("wordsPerMinute");
  const [accuracy, setAccuracy] = useGlobalState("accuracy");

  // Local state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [testHistory, setTestHistory] = useState([]);
  const [startTime, setStartTime] = useState(null);

  // Local refs
  const intervalRef = useRef(null);
  const inputRef = useRef(null);
  const textDisplayRef = useRef(null);

  // Initialize text
  useEffect(() => {
    setText(getRandomText());
  }, [setText]);

  // Handle timer
  useEffect(() => {
    if (status === "running") {
      // Record start time for accurate WPM calculation
      if (!startTime) {
        setStartTime(Date.now());
      }

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setStatus("finished");
            calculateStats();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status, setTimeLeft, setStatus, startTime]);

  // Auto-scroll text display to keep current word visible
  useEffect(() => {
    if (textDisplayRef.current && status === "running") {
      const wordElements = textDisplayRef.current.children;
      if (wordElements[currentWordIndex]) {
        wordElements[currentWordIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentWordIndex, status]);

  // Calculate typing statistics with corrected WPM
  const calculateStats = () => {
    // Standard WPM calculation: (characters typed / 5) / time in minutes
    // 5 characters is the statistical average for word length in English

    // Count only correctly typed characters for accurate WPM
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (i < text.length && userInput[i] === text[i]) {
        correctChars++;
      }
    }

    // Calculate time in minutes (from actual start time for accuracy)
    const timeInMinutes = (Date.now() - startTime) / 60000;

    // Calculate WPM using the standard formula
    const calculatedWPM = Math.round(correctChars / 5 / timeInMinutes);
    setWordsPerMinute(calculatedWPM);

    // Calculate accuracy
    const typedChars = userInput.length;
    const calculatedAccuracy =
      Math.round((correctChars / typedChars) * 100) || 0;
    setAccuracy(calculatedAccuracy);

    // Save test history
    const newHistory = [
      ...testHistory,
      {
        date: new Date(),
        wpm: calculatedWPM,
        accuracy: calculatedAccuracy,
        duration: timer,
        charsTyped: typedChars,
        correctChars: correctChars,
      },
    ];
    setTestHistory(newHistory);

    // Save to local storage if available
    if (typeof window !== "undefined") {
      localStorage.setItem("typingHistory", JSON.stringify(newHistory));
    }
  };

  // Load history from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("typingHistory");
      if (savedHistory) {
        try {
          setTestHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Error loading history:", e);
        }
      }
    }
  }, []);

  // Start the test
  const startTest = () => {
    setStatus("running");
    setTimeLeft(timer);
    setUserInput("");
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setStartTime(Date.now()); // Record exact start time
    if (inputRef.current) inputRef.current.focus();
  };

  // Reset the test
  const resetTest = () => {
    setStatus("idle");
    setTimeLeft(0);
    setUserInput("");
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setStartTime(null);
    setText(getRandomText());
  };

  // Handle input
  const handleInputChange = (e) => {
    if (status === "running") {
      const newValue = e.target.value;
      setUserInput(newValue);

      // Update current word/char index for scrolling
      const words = text.split(" ");
      const typed = newValue.split(" ");
      setCurrentWordIndex(typed.length - 1);

      if (typed.length <= words.length) {
        setCurrentCharIndex(typed[typed.length - 1].length);
      }
    }
  };

  // Display text with highlighting for typed characters
  const renderText = () => {
    const words = text.split(" ");
    const typed = userInput.split(" ");

    return (
      <div
        ref={textDisplayRef}
        className="text-lg leading-relaxed whitespace-pre-wrap"
      >
        {words.map((word, wordIdx) => {
          const isCurrentWord = wordIdx === currentWordIndex;

          return (
            <span
              key={wordIdx}
              className={`inline-block mr-2 ${
                isCurrentWord ? "bg-blue-50 dark:bg-blue-900" : ""
              }`}
            >
              {word.split("").map((char, charIdx) => {
                let className = "";

                if (wordIdx < typed.length) {
                  if (wordIdx === typed.length - 1) {
                    // Current word
                    if (charIdx < typed[wordIdx].length) {
                      className =
                        typed[wordIdx][charIdx] === char
                          ? "text-green-500"
                          : "text-red-500 bg-red-100 dark:bg-red-900";
                    }
                  } else {
                    // Past word
                    className =
                      typed[wordIdx] === words[wordIdx]
                        ? "text-green-500"
                        : "text-red-500";
                  }
                }

                return (
                  <span key={charIdx} className={className}>
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    );
  };

  // Progress bar for timer
  const renderProgressBar = () => {
    const progress = ((timer - timeLeft) / timer) * 100;

    return (
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  // Calculate current WPM while typing
  const calculateCurrentWPM = () => {
    if (status !== "running" || !startTime || userInput.length === 0) {
      return 0;
    }

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (i < text.length && userInput[i] === text[i]) {
        correctChars++;
      }
    }

    const timeInMinutes = (Date.now() - startTime) / 60000;
    return Math.round(correctChars / 5 / timeInMinutes);
  };

  const currentWPM = calculateCurrentWPM();

  return (
    <div className="w-full">
      <TimerSelector
        selectedTime={timer}
        onSelectTime={(time) => {
          setTimer(time);
          resetTest();
        }}
      />

      <div className="mb-4 text-center">
        {status === "idle" && (
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            onClick={startTest}
          >
            Start Typing Test
          </button>
        )}

        {status === "running" && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {timeLeft}s left
              </div>
              {currentWPM > 0 && (
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Current: {currentWPM} WPM
                </div>
              )}
            </div>
            {renderProgressBar()}
          </div>
        )}

        {status === "finished" && (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Test Completed!
            </div>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{wordsPerMinute}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Words per minute
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{accuracy}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Accuracy
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                onClick={resetTest}
              >
                Try Again
              </button>
              <button
                className="px-6 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
                onClick={() => {
                  // Share functionality would go here
                  alert("Share feature coming soon!");
                }}
              >
                Share Results
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Display the text to type */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4 min-h-24 max-h-48 overflow-y-auto">
        {renderText()}
      </div>

      {/* Input field */}
      {status !== "finished" && (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={status === "idle"}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder={
              status === "idle"
                ? "Click 'Start' to begin typing..."
                : "Start typing..."
            }
          />
          {status === "idle" && (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">
                Click 'Start' button above to begin
              </span>
            </div>
          )}
        </div>
      )}

      {/* Test history summary */}
      {testHistory.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">
            Your Recent Tests
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {testHistory
              .slice(-3)
              .reverse()
              .map((test, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600"
                >
                  <div className="font-medium dark:text-gray-200">
                    {test.wpm} WPM
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {test.accuracy}% accuracy
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {test.duration}s test
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
