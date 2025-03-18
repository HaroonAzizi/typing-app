// components/TimerSelector.jsx
"use client";

import React from "react";

const TimerSelector = ({ selectedTime, onSelectTime }) => {
  const timeOptions = [15, 30, 60];

  return (
    <div className="flex justify-center gap-4 mb-6">
      {timeOptions.map((time) => (
        <button
          key={time}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedTime === time
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
          onClick={() => onSelectTime(time)}
        >
          {time} seconds
        </button>
      ))}
    </div>
  );
};

export default TimerSelector;
