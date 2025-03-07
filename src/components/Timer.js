import { useState, useEffect } from "react";

export const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
      setTimeLeft(minutes * 60);
  }, [minutes]);

  useEffect(() => {
      if (!isRunning || timeLeft <= 0) return;

      const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
      setIsRunning(false);
      setTimeLeft(minutes * 60);
  };

  const openSettings = () => {
      setIsSettingsOpen(true);
  };

  const closeSettings = () => {
      setIsSettingsOpen(false);
  };

  return (
      <div className="timer-container">
          <button className="button-settings" onClick={openSettings}>
              <span className="material-icons">settings</span>
          </button>

          {isSettingsOpen && (
              <div className="back-settings">
                  <div className="container-settings">
                      <p className="titleSettingsScreen">Settings</p>
                      <button className="close-settings" onClick={closeSettings}>
                          <span className="material-icons">close</span>
                      </button>

                      <div className="input-container">
                          <label htmlFor="minutes-input">Set Minutes:</label>
                          <input
                              id="minutes-input"
                              type="number"
                              value={minutes}
                              onChange={(e) => setMinutes(Math.max(1, Number(e.target.value)))}
                              disabled={isRunning}
                          />
                      </div>
                  </div>
              </div>
          )}

          <p className="time">{formatTime(timeLeft)}</p>
          <button className="button-startStop" onClick={() => setIsRunning(!isRunning)} >
              {isRunning ? <span className="material-icons">pause</span> : <span className="material-icons">play_arrow</span>}
          </button>

          <br /><br />

          <button className="button-startStop" onClick={resetTimer}>
              <span className="material-icons">repeat</span>
          </button>
      </div>
  );
}