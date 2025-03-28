"use client";

import React from "react";

const TimerSelector = ({ selectedTime, onSelectTime }) => {
  const timeOptions = [15, 30, 60]; // Removed 120 seconds option

  return (
    <div className="mb-6">
      <div className="text-center mb-2 text-theme-text-muted text-sm font-mono">
        Test Duration (seconds)
      </div>
      <div className="flex justify-center space-x-2">
        {timeOptions.map((time) => (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
            className={`px-4 py-2 rounded-md font-mono transition-all ${
              selectedTime === time
                ? "bg-theme-accent text-white shadow-glow"
                : "bg-theme-secondary/50 text-theme-text-muted hover:bg-theme-secondary"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimerSelector;
