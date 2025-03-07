import React from 'react'
import { useState } from "react";
import { TimerShortBreak } from './TimerShortBreak';
import { TimerLongBreak } from './TimerLongBreak';
import { TimerPomodoro } from './TimerPomodoro';

export const TimerGestord = () => {
    const [componenteActual, setComponenteActual] = useState(null);

    const renderizarComponente = () => {
      switch (componenteActual) {
        case "componente1":
          return <TimerPomodoro />;
        case "componente2":
          return <TimerShortBreak />;
        case "componente3":
          return <TimerLongBreak />;
        default:
            return <TimerPomodoro />;
      }
    };
  
    return (
      <div className="p-4">
        <div className="space-x-2 mb-4">
          <button className="button-startStop" onClick={() => setComponenteActual("componente1")}>
            POMODORO
          </button>
          <button className="button-startStop" onClick={() => setComponenteActual("componente2")}>
            SHORT BREAK
          </button>
          <button className="button-startStop" onClick={() => setComponenteActual("componente3")}>
            LONG BREAK
          </button>
        </div>
        <div className="border p-4">{renderizarComponente()}</div>
      </div>
    );
}