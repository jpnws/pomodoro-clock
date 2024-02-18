import { useState, useRef } from "react";

import "./App.css";

const initState = {
  breakLength: 5,
  breakTimeLeft: 0,
  breakRunning: false,
  breakInit: true,
  sessionLength: 25,
  sessionTimeLeft: 1500,
  sessionRunning: false,
  sessionInit: true,
  timerLabel: "Session",
};

function App() {
  const [info, setInfo] = useState(initState);
  const sessionInterval = useRef(null);
  const breakInterval = useRef(null);

  const handleReset = () => {
    document.getElementById("beep").load();
    clearInterval(sessionInterval.current);
    clearInterval(breakInterval.current);
    setInfo(initState);
  };

  const handleBreakIncrement = () => {
    if (info.breakLength < 60) {
      setInfo({ ...info, breakLength: info.breakLength + 1 });
    }
  };

  const handleBreakDecrement = () => {
    if (info.breakLength > 1) {
      setInfo({ ...info, breakLength: info.breakLength - 1 });
    }
  };

  const handleSessionIncrement = () => {
    if (info.sessionLength < 60) {
      setInfo({
        ...info,
        sessionLength: info.sessionLength + 1,
        sessionTimeLeft: (info.sessionLength + 1) * 60,
      });
    }
  };

  const handleSessionDecrement = () => {
    if (info.sessionLength > 1) {
      setInfo({
        ...info,
        sessionLength: info.sessionLength - 1,
        sessionTimeLeft: (info.sessionLength - 1) * 60,
      });
    }
  };

  const handleStartStop = () => {
    if (info.sessionInit) {
      setInfo((currentInfo) => {
        return {
          ...currentInfo,
          sessionTimeLeft: currentInfo.sessionLength * 60,
          sessionInit: false,
          sessionRunning: true,
          timerLabel: "Session",
        };
      });
      sessionInterval.current = setInterval(() => countDownSession(), 1000);
    } else if (!info.sessionRunning) {
      setInfo({ ...info, sessionRunning: true });
      sessionInterval.current = setInterval(() => countDownSession(), 1000);
    } else {
      clearInterval(sessionInterval.current);
      setInfo({ ...info, sessionRunning: false });
    }
  };

  const countDownSession = () => {
    setInfo((currentInfo) => {
      if (currentInfo.sessionTimeLeft > 0) {
        return {
          ...currentInfo,
          sessionTimeLeft: currentInfo.sessionTimeLeft - 1,
        };
      } else if (currentInfo.sessionTimeLeft === 0) {
        document.getElementById("beep").play();
        clearInterval(sessionInterval.current);
        breakInterval.current = setInterval(() => countDownBreak(), 1000);
        return {
          sessionRunning: false,
          sessionInit: true,
          breakTimeLeft: currentInfo.breakLength * 60,
          breakInit: false,
          breakRunning: true,
          timerLabel: "Break",
        };
      }
    });
  };

  const countDownBreak = () => {
    if (info.breakTimeLeft > 0) {
      setInfo({ ...info, breakTimeLeft: info.breakTimeLeft - 1 });
    } else if (info.breakTimeLeft === 0) {
      document.getElementById("beep").play();
      clearInterval(breakInterval.current);
      setInfo({
        ...info,
        breakRunning: false,
        breakInit: true,
        sessionTimeLeft: info.sessionLength * 60,
        sessionInit: false,
        sessionRunning: true,
        timerLabel: "Session",
      });
      sessionInterval.current = setInterval(() => countDownSession(), 1000);
    }
  };

  const pad = (n, width, z) => {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  let minutes = Math.trunc(info.sessionTimeLeft / 60);
  let seconds = info.sessionTimeLeft - minutes * 60;
  if (info.breakRunning) {
    minutes = Math.trunc(info.breakTimeLeft / 60);
    seconds = info.breakTimeLeft - minutes * 60;
  }
  minutes = pad(minutes, 2);
  seconds = pad(seconds, 2);

  return (
    <div className="subroot-wrapper">
      <div className="clock-title">Pomodoro Clock</div>
      <div className="timer-box">
        <div id="timer-label">{info.timerLabel}</div>
        <div id="time-left">{`${minutes}:${seconds}`}</div>
      </div>
      <div className="length-box">
        <div className="session-length-box">
          <div id="session-label">Session Length</div>
          <div id="session-length">{info.sessionLength}</div>
          <button
            id="session-increment"
            className="session-increment-btn"
            onClick={handleSessionIncrement}
          >
            ⮝
          </button>
          <button
            id="session-decrement"
            className="session-decrement-btn"
            onClick={handleSessionDecrement}
          >
            ⮟
          </button>
        </div>
        <div className="break-length-box">
          <div id="break-label">Break Length</div>
          <div id="break-length">{info.breakLength}</div>
          <button
            id="break-increment"
            className="break-increment-btn"
            onClick={handleBreakIncrement}
          >
            ⮝
          </button>
          <button
            id="break-decrement"
            className="break-decrement-btn"
            onClick={handleBreakDecrement}
          >
            ⮟
          </button>
        </div>
      </div>
      <div className="control-box">
        <button
          id="start_stop"
          className="start-stop-btn"
          onClick={handleStartStop}
        >
          {((info.sessionRunning || info.breakRunning) && "⏸") || "▶"}
        </button>
        <button
          id="reset"
          className="reset-btn"
          onClick={handleReset}
        >
          ↺
        </button>
      </div>
      <audio
        className="beep-audio"
        id="beep"
        src="beep.mp3"
      ></audio>
    </div>
  );
}

export default App;
