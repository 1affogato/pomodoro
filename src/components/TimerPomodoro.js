import { useState, useEffect } from "react";

export const TimerPomodoro = () => {

    const [minutes, setMinutes] = useState(25);
    const [timeLeft, setTimeLeft] = useState(minutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#211C84");
    const [fontColor, setFontColor] = useState("#e4dcf8");

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setBackgroundColor(newColor);
    
        document.documentElement.style.setProperty("--backColor", newColor);
      };

      const fontHandleColorChange = (e) => {
        const newColor = e.target.value;
        setFontColor(newColor);
    
        document.documentElement.style.setProperty("--fontColor", newColor);
      };
    
    const progressPercentage = ((1 - timeLeft / (minutes * 60)) * 100).toFixed(2);

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
        <div className="progressBar">
                <div
                    className="progressBarLine"
                    style={{ width: `${progressPercentage}%` }}
                ></div>   
        </div>

        <button className="button-settings" onClick={openSettings}>
            <span className="material-icons">settings</span>
        </button>

        {isSettingsOpen && (
            <div className="back-settings">
                <div className="container-settings">
                    <p className="titleSettingsScreen">Set minutes</p>
                    <button className="close-settings" onClick={closeSettings}>
                        <span className="material-icons">close</span>
                    </button>

                    <div className="input-container">
                        <input
                            id="minutes-input"
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(Math.max(1, Number(e.target.value)))}
                            disabled={isRunning}
                        />
                    </div>
                    <p className="titleSettingsScreen">Background Color:</p>
                    <div className="input-container">
                        <input
                            type="color"
                            onChange={handleColorChange}
                        />
                    </div>

                    <p className="titleSettingsScreen">Font Color:</p>
                    <div className="input-container">
                        <input
                            type="color"
                            onChange={fontHandleColorChange}
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