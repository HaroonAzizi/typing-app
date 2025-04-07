import { useState, useEffect } from "react";
import { FaGlobe, FaTimes } from "react-icons/fa";

export default function DomainAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Show the ad after a delay when the component mounts
  useEffect(() => {
    // Check if user has previously closed the ad
    const adClosed = localStorage.getItem("domainAdClosed");

    if (adClosed === "true") {
      setIsVisible(false);
      return;
    }

    // Show ad after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Store that user has closed the ad
    localStorage.setItem("domainAdClosed", "true");
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setIsVisible(true);
  };

  if (!isVisible && !isMinimized) return null;

  return (
    <>
      {/* Main Ad */}
      {isVisible && !isMinimized && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[280px] sm:max-w-xs w-full animate-slide-in-right">
          <div className="glass-card border border-slate-500/30 overflow-hidden shadow-md scale-90 sm:scale-100 origin-bottom-right">
            {/* Ad Header */}
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/30">
              <div className="flex items-center">
                <FaGlobe className="text-blue-400 mr-2 text-sm sm:text-base" />
                <span className="font-mono text-xs sm:text-sm text-white font-medium">
                  Domain for Sale
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleMinimize}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Minimize advertisement"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Close advertisement"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>

            {/* Ad Content */}
            <div className="p-3 sm:p-4 bg-slate-900/80">
              <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-1 sm:mb-2">
                  <a href="https://code.af">code.af</a>
                </h3>
                <div className="font-mono text-xs sm:text-sm text-slate-300 mb-2 sm:mb-3">
                  Premium Tech Domain
                </div>
                <div className="relative h-10 sm:h-12 mb-3 sm:mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse-text">
                    <span className="text-blue-400 font-mono font-bold text-base sm:text-lg">
                      code.af
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse-text-delay">
                    <span className="text-slate-300 font-mono text-base sm:text-lg">
                      Your Brand Here
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
                Own this premium tech domain for your next project or business.
              </div>

              <a
                href="mailto:hi@haroonazizi.com?subject=Interested%20in%20code.af%20domain"
                className="block w-full py-1.5 sm:py-2 px-3 sm:px-4 bg-blue-600 text-white font-medium rounded text-center hover:bg-blue-500 transition-colors font-mono text-xs sm:text-sm"
              >
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Minimized version */}
      {isMinimized && (
        <button
          onClick={handleRestore}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-2 sm:p-3 bg-blue-600 rounded-full shadow-md animate-bounce-subtle"
          aria-label="Show domain advertisement"
        >
          <FaGlobe className="text-white text-sm sm:text-base" />
        </button>
      )}
    </>
  );
}
