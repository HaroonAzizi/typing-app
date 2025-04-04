"use client";

import React, { useEffect, useState, useRef } from "react";
import TimerSelector from "./TimerSelector";
import { useGlobalState } from "../store";
import { getRandomText } from "../utils/textUtils";

const TypingTest = () => {
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
  const [maxWpm, setMaxWpm] = useState(0); // Track maximum WPM during the test

  // Local refs
  const intervalRef = useRef(null);
  const textDisplayRef = useRef(null);
  const currentCharRef = useRef(null);
  const wpmCheckRef = useRef(null); // For checking WPM regularly

  // Initialize text and set focus
  useEffect(() => {
    setText(getRandomText());
    setTimeLeft(timer); // Now uses correct initial timer value
  }, [setText, setTimeLeft]);

  // Remove the useEffect that was setting timer to 15

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

  // Update cursor position
  const updateCursorPosition = () => {
    if (currentCharRef.current) {
      const rect = currentCharRef.current.getBoundingClientRect();
      const textRect = textDisplayRef.current.getBoundingClientRect();

      setCursorPosition({
        left: rect.left - textRect.left,
        top: rect.top - textRect.top,
      });
    }
  };

  const handleKeyDown = (e) => {
    // Tab+Enter shortcut to restart the test
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

      // Only allow backspace if we're not at the beginning of the current word
      const lastSpaceIndex = userInput.lastIndexOf(" ");
      if (lastSpaceIndex !== userInput.length - 1) {
        // We're not right after a space, so allow backspace
        const newInput = userInput.slice(0, -1);
        setUserInput(newInput);
        updateWordIndices(newInput);
      }
      // If we're at a space after a completed word, backspace does nothing
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

      // Check and update max WPM regularly
      wpmCheckRef.current = setInterval(() => {
        const currentWpm = calculateCurrentWPM();
        if (currentWpm > maxWpm) {
          setMaxWpm(currentWpm);
        }
      }, 500); // Check twice per second

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            clearInterval(wpmCheckRef.current);
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
      if (wpmCheckRef.current) clearInterval(wpmCheckRef.current);
    };
  }, [status, setTimeLeft, setStatus, startTime, maxWpm]);

  // Add this new effect here to handle early completion
  useEffect(() => {
    if (status === "running" && userInput === text) {
      clearInterval(intervalRef.current);
      clearInterval(wpmCheckRef.current);
      setStatus("finished");
      calculateStats();
    }
  }, [userInput, text, status]);

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
    // Use the maximum WPM recorded during the test, or calculate if none
    const finalWpm = maxWpm > 0 ? maxWpm : calculateFinalWPM();

    // Count correctly typed characters for accurate WPM and accuracy
    let correctChars = 0;
    const minLength = Math.min(userInput.length, text.length);

    for (let i = 0; i < minLength; i++) {
      if (userInput[i] === text[i]) {
        correctChars++;
      }
    }

    // Calculate accuracy - correctly typed characters divided by total typed characters
    const accuracyPercentage = Math.round(
      (correctChars / Math.max(1, userInput.length)) * 100
    );
    setAccuracy(accuracyPercentage);

    // Set the final WPM
    setWordsPerMinute(finalWpm);

    // Save test history
    const newHistory = [
      ...testHistory,
      {
        date: new Date(),
        wpm: finalWpm,
        accuracy: accuracyPercentage,
        duration: timer,
        charsTyped: userInput.length,
        correctChars: correctChars,
      },
    ];
    setTestHistory(newHistory);

    // Save to local storage if available
    if (typeof window !== "undefined") {
      localStorage.setItem("typingHistory", JSON.stringify(newHistory));
    }
  };

  // Calculate final WPM if no history is available
  const calculateFinalWPM = () => {
    if (!startTime || userInput.length === 0) {
      return 0;
    }

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (i < text.length && userInput[i] === text[i]) {
        correctChars++;
      }
    }

    const endTime = Date.now();
    const elapsedTimeInSeconds = Math.max(1, (endTime - startTime) / 1000);
    const minutes = elapsedTimeInSeconds / 60;

    return Math.round(correctChars / 5 / minutes);
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
    setMaxWpm(0); // Reset the maximum WPM
    setText(getRandomText());
  };

  // Display text with highlighting for typed characters
  const renderText = () => {
    const words = text.split(" ");
    const typed = userInput.split(" ");

    return (
      <div
        ref={textDisplayRef}
        className="text-lg leading-relaxed whitespace-pre-wrap relative outline-none font-mono"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {words.map((word, wordIdx) => {
          const isCurrentWord = wordIdx === currentWordIndex;

          return (
            <span
              key={wordIdx}
              className={`inline-block mr-2 ${
                isCurrentWord ? "bg-theme-accent/10 rounded" : ""
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
                          : "text-red-500 bg-red-100/10 rounded";
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
            className="absolute w-0.5 h-6 bg-theme-accent animate-blink transition-all duration-100"
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
    const elapsedTime = Date.now() - startTime;
    const progress = (elapsedTime / (timer * 1000)) * 100;

    return (
      <div className="w-full h-2 bg-theme-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-theme-accent transition-all duration-1000 ease-linear"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    );
  };

  const currentWPM = calculateCurrentWPM();

  return (
    <div className="w-full text-theme-text">
      <TimerSelector
        selectedTime={timer}
        onSelectTime={(time) => {
          setTimer(time);
          setTimeLeft(time);
          setStatus("idle"); // Ensure we're in idle state
          resetTest();
        }}
      />
      <div className="mb-4 text-center">
        {status === "idle" && (
          <div className="text-lg text-theme-text-muted">
            Start typing to begin...
          </div>
        )}

        {status === "running" && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-theme-accent">
                {timeLeft}s left
              </div>
              {currentWPM > 0 && (
                <div className="text-sm font-medium text-theme-text-muted">
                  Current: {currentWPM} WPM
                </div>
              )}
            </div>
            {renderProgressBar()}
          </div>
        )}

        {status === "finished" && (
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-theme-accent to-theme-accent-light bg-clip-text text-transparent">
              Test Complete!
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-card p-4 text-center">
                <div className="text-theme-text-muted text-sm mb-1">Speed</div>
                <div className="text-3xl font-bold text-theme-accent">
                  {wordsPerMinute}
                </div>
                <div className="text-theme-text-muted text-xs">WPM</div>
              </div>

              <div className="glass-card p-4 text-center opacity-50">
                <div className="text-theme-text-muted text-sm mb-1">
                  Accuracy
                </div>
                <div className="text-3xl font-bold text-gray-500">
                  {accuracy}%
                </div>
                <div className="text-theme-text-muted text-xs">correct</div>
              </div>
            </div>

            {/* <button onClick={resetTest} className="btn-modern w-full">
              Try Again
            </button> */}
          </div>
        )}
      </div>
      <div className="mt-6 glass-card p-6 min-h-[200px] max-h-[300px] overflow-y-auto">
        {renderText()}
      </div>

      {/* Restart button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={resetTest}
          className="px-4 py-2 bg-theme-secondary hover:bg-theme-secondary/80 text-theme-text-muted hover:text-theme-text rounded-md transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Restart Test
        </button>
      </div>

      {status === "finished" && testHistory.length > 1 && (
        <div className="mt-8 glass-card p-6">
          <h3 className="text-xl font-bold text-theme-text mb-4">
            Your Progress
          </h3>
          <div className="h-40 relative">
            {/* Simple chart visualization could go here */}
            <div className="absolute inset-0 flex items-end">
              {testHistory.slice(-10).map((test, i) => (
                <div
                  key={i}
                  className="flex-1 mx-1 bg-theme-accent hover:bg-theme-accent-light transition-colors relative group"
                  style={{ height: `${Math.min(100, test.wpm / 2)}%` }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-theme-secondary px-2 py-1 rounded text-xs whitespace-nowrap">
                    {test.wpm} WPM
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-theme-text-muted"></div>
          </div>
        </div>
      )}
      <div className="mt-6 text-center text-theme-text-muted text-sm">
        <p>
          Press{" "}
          <kbd className="px-2 py-1 bg-theme-secondary rounded font-mono text-xs">
            Tab
          </kbd>{" "}
          +{" "}
          <kbd className="px-2 py-1 bg-theme-secondary rounded font-mono text-xs">
            Enter
          </kbd>{" "}
          to restart the test
        </p>
      </div>
    </div>
  );
};

export default TypingTest;
