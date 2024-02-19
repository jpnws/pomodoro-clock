import { useState, useRef, useEffect } from "react";

import beep from "./assets/beep.mp3";

import "./App.css";
import StartButton from "./StartButton/StartButton";
import StopButton from "./StopButton/StopButton";
import ResetButton from "./ResetButton/ResetButton";

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
  const audioRef = useRef(null);

  const handleReset = () => {
    document.getElementById("beep").load();
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
      setInfo({
        ...info,
        sessionTimeLeft: info.sessionLength * 60,
        sessionInit: false,
        sessionRunning: true,
        timerLabel: "Session",
      });
    } else if (!info.sessionRunning) {
      setInfo({ ...info, sessionRunning: true });
    } else {
      setInfo({ ...info, sessionRunning: false });
    }
  };

  useEffect(() => {
    if (info.sessionRunning && !info.breakRunning) {
      const interval = setInterval(() => {
        setInfo((prevInfo) => {
          if (prevInfo.sessionTimeLeft > 0) {
            return {
              ...prevInfo,
              sessionTimeLeft: prevInfo.sessionTimeLeft - 1,
            };
          } else {
            audioRef.current.play();
            return {
              ...prevInfo,
              sessionRunning: false,
              sessionInit: true,
              breakTimeLeft: prevInfo.breakLength * 60,
              breakInit: false,
              breakRunning: true,
              timerLabel: "Break",
            };
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [info.sessionRunning, info.breakRunning]);

  useEffect(() => {
    if (info.breakRunning) {
      const interval = setInterval(() => {
        setInfo((prevInfo) => {
          if (prevInfo.breakTimeLeft > 0) {
            return { ...prevInfo, breakTimeLeft: prevInfo.breakTimeLeft - 1 };
          } else {
            audioRef.current.play();
            return {
              ...prevInfo,
              breakRunning: false,
              breakInit: true,
              sessionTimeLeft: prevInfo.sessionLength * 60,
              sessionInit: false,
              sessionRunning: true,
              timerLabel: "Session",
            };
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [info.breakRunning]);

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
          <div id="session-length">{info.sessionLength} minutes</div>
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
          <div id="break-length">{info.breakLength} minutes</div>
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
        <StartButton
          sessionRunning={info.sessionRunning}
          breakRunning={info.breakRunning}
          handleStartStop={handleStartStop}
        />
        <StopButton
          sessionRunning={info.sessionRunning}
          breakRunning={info.breakRunning}
          handleStartStop={handleStartStop}
        />
        <ResetButton handleReset={handleReset}>Reset</ResetButton>
      </div>
      <audio
        className="beep-audio"
        id="beep"
        src={beep}
        ref={audioRef}
      ></audio>
    </div>
  );
}

export default App;
