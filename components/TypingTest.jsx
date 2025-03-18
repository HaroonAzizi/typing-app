// components/TypingTest.jsx - Fixed WPM calculation and UX improvements
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
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

  // Local refs
  const intervalRef = useRef(null);
  const textDisplayRef = useRef(null);
  const currentCharRef = useRef(null);

  // Initialize text and set focus
  useEffect(() => {
    setText(getRandomText());
    // Set initial timer value
    setTimeLeft(timer);
  }, [setText, timer, setTimeLeft]);

  // Auto-start when user starts typing
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore modifier keys and special keys
      if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1) return;

      if (status === "idle") {
        startTest();
        // Capture the first character immediately
        if (e.key.length === 1) {
          setUserInput(e.key);
          updateWordIndices(e.key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status]);

  // Handle input
  const handleKeyDown = (e) => {
    // Add Tab+Enter shortcut to restart the test
    if (e.key === "Enter" && e.getModifierState("Tab")) {
      e.preventDefault();
      resetTest();
      return;
    }
    
    if (status !== "running") {
      return;
    }

    // Handle typing logic
    if (e.key === "Backspace") {
      e.preventDefault();
      const newInput = userInput.slice(0, -1);
      setUserInput(newInput);
      updateWordIndices(newInput);
    } else if (e.key === " ") {
      e.preventDefault();
      const newInput = userInput + " ";
      setUserInput(newInput);
      updateWordIndices(newInput);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      const newInput = userInput + e.key;
      setUserInput(newInput);
      updateWordIndices(newInput);
    }
  };

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

  // Update cursor position
  const updateCursorPosition = () => {
    if (currentCharRef.current) {
      const rect = currentCharRef.current.getBoundingClientRect();
      const textRect = textDisplayRef.current.getBoundingClientRect();

      setCursorPosition({
        left: rect.right - textRect.left,
        top: rect.top - textRect.top,
      });
    }
  };

  // Separate function for updating word indices and cursor position
  const updateWordIndices = (input) => {
    const words = text.split(" ");
    const typed = input.split(" ");
    const newWordIndex = Math.min(typed.length - 1, words.length - 1);
    setCurrentWordIndex(newWordIndex);

    if (typed.length <= words.length) {
      setCurrentCharIndex(typed[typed.length - 1].length);
    }

    // Update cursor position immediately
    requestAnimationFrame(updateCursorPosition);
  };

  // Calculate typing statistics with fixed WPM
  const calculateStats = () => {
    // Count only correctly typed characters for accurate WPM
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (i < text.length && userInput[i] === text[i]) {
        correctChars++;
      }
    }

    // Calculate time in minutes (from actual start time for accuracy)
    const timeInMinutes = (Date.now() - startTime) / 60000;

    // Use max(0.01, timeInMinutes) to prevent division by zero or very small numbers
    const effectiveTimeInMinutes = Math.max(0.01, timeInMinutes);

    // Calculate WPM using the standard formula
    const calculatedWPM = Math.round(correctChars / 5 / effectiveTimeInMinutes);
    setWordsPerMinute(calculatedWPM);

    // Calculate accuracy
    const typedChars = Math.max(1, userInput.length); // Prevent division by zero
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

    const timeInMinutes = Math.max(0.01, (Date.now() - startTime) / 60000);
    return Math.round(correctChars / 5 / timeInMinutes);
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
    textDisplayRef.current?.focus();
  };

  // Reset the test
  const resetTest = () => {
    setStatus("idle");
    setTimeLeft(timer);
    setUserInput("");
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setStartTime(null);
    setText(getRandomText());
  };

  // Display text with highlighting for typed characters
  const renderText = () => {
    const words = text.split(" ");
    const typed = userInput.split(" ");

    return (
      <div
        ref={textDisplayRef}
        className="text-lg leading-relaxed whitespace-pre-wrap relative outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
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
                const isCurrentChar =
                  wordIdx === currentWordIndex && charIdx === currentCharIndex;

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
                  <span
                    key={charIdx}
                    className={className}
                    ref={isCurrentChar ? currentCharRef : null}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}

        {/* Typing cursor */}
        {status === "running" && (
          <span
            className="absolute w-0.5 h-6 bg-blue-500 animate-blink transition-all duration-100"
            style={{
              left: `${cursorPosition.left}px`,
              top: `${cursorPosition.top}px`,
            }}
          />
        )}
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

  const currentWPM = calculateCurrentWPM();

  return (
    <div className="w-full dark:bg-gray-800 dark:text-white">
      <TimerSelector
        selectedTime={timer}
        onSelectTime={(time) => {
          setTimer(time);
          resetTest();
        }}
      />

      <div className="mb-4 text-center">
        {status === "idle" && (
          <div className="text-lg text-gray-600 dark:text-gray-300">
            Start typing to begin...
          </div>
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

      {/* Combined text and typing area */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4 min-h-40 max-h-60 overflow-y-auto focus-within:ring-2 focus-within:ring-blue-500">
        {renderText()}
      </div>

      {/* Try Again button below typing area */}
      <div className="mb-6 text-center">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          onClick={resetTest}
        >
          Try Again
        </button>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Press Tab + Enter to restart
        </div>
      </div>

      {/* Test history summary */}
      {testHistory.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">
            Test History
          </h3>
          <div className="space-y-2">
            {testHistory
              .slice(-5)
              .reverse()
              .map((test, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-2 border-b border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {new Date(test.date).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(test.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {test.wpm}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        WPM
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {test.accuracy}%
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ACC
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {test.duration}s
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {testHistory.length > 5 && (
            <div className="mt-2 text-center">
              <button
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => {
                  // View full history functionality would go here
                  alert("Full history view coming soon!");
                }}
              >
                View full history
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TypingTest;
