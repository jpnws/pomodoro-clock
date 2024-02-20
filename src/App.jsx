import { useState, useRef, useEffect } from "react";

import StartButton from "./StartButton/StartButton";
import StopButton from "./StopButton/StopButton";
import ResetButton from "./ResetButton/ResetButton";
import SessionLengthBox from "./SessionLengthBox/SessionLengthBox";
import BreakLengthBox from "./BreakLengthBox/BreakLengthBox";

import beep from "./assets/beep.mp3";

import styles from "./App.module.css";
import TimerBox from "./TimerBox/TimerBox";

const initState = {
  breakLength: 5,
  breakTimeLeft: 0,
  breakRunning: false,
  breakInit: true,
  sessionLength: 0.05,
  sessionTimeLeft: 1500,
  sessionRunning: false,
  sessionInit: true,
  timerLabel: "Session",
};

function App() {
  const [info, setInfo] = useState(initState);
  const audioRef = useRef(null);

  const handleReset = () => {
    setInfo(initState);
  };

  const handleBreakIncrement = () => {
    if (info.breakLength < 60) {
      setInfo({
        ...info,
        breakLength: info.breakLength + 1,
        breakTimeLeft: (info.breakLength + 1) * 60,
      });
    }
  };

  const handleBreakDecrement = () => {
    if (info.breakLength > 1) {
      setInfo({
        ...info,
        breakLength: info.breakLength - 1,
        breakTimeLeft: (info.breakLength - 1) * 60,
      });
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

  const handleStart = () => {
    if (info.sessionInit) {
      setInfo({
        ...info,
        sessionTimeLeft: info.sessionLength * 60,
        sessionInit: false,
        sessionRunning: true,
        timerLabel: "Session",
      });
    } else if (!info.sessionRunning && info.sessionTimeLeft > 0) {
      setInfo({
        ...info,
        sessionRunning: true,
      });
    } else if (!info.breakRunning && info.breakTimeLeft > 0) {
      setInfo({
        ...info,
        breakRunning: true,
      });
    }
  };

  const handleStop = () => {
    if (info.sessionRunning) {
      setInfo({ ...info, sessionRunning: false });
    } else if (info.breakRunning) {
      setInfo({ ...info, breakRunning: false, sessionInit: false });
    }
  };

  useEffect(() => {
    if (info.sessionRunning) {
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
  }, [info.sessionRunning]);

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
  if (info.breakRunning || (info.sessionTimeLeft === 0 && !info.breakRunning)) {
    minutes = Math.trunc(info.breakTimeLeft / 60);
    seconds = info.breakTimeLeft - minutes * 60;
  }
  minutes = pad(minutes, 2);
  seconds = pad(seconds, 2);

  return (
    <div className={styles.subrootWrapper}>
      <header className={styles.clockTitle}>Pomodoro Clock</header>
      <main>
        <TimerBox
          timerLabel={info.timerLabel}
          minutes={minutes}
          seconds={seconds}
        />
        <div className={styles.lengthBox}>
          <SessionLengthBox
            sessionLength={info.sessionLength}
            handleSessionIncrement={handleSessionIncrement}
            handleSessionDecrement={handleSessionDecrement}
          />
          <BreakLengthBox
            breakLength={info.breakLength}
            handleBreakIncrement={handleBreakIncrement}
            handleBreakDecrement={handleBreakDecrement}
          />
        </div>
        <div className={styles.controlBox}>
          <StartButton
            sessionRunning={info.sessionRunning}
            breakRunning={info.breakRunning}
            handleStartStop={handleStart}
          />
          <StopButton
            sessionRunning={info.sessionRunning}
            breakRunning={info.breakRunning}
            handleStartStop={handleStop}
          />
          <ResetButton
            handleReset={handleReset}
            sessionRunning={info.sessionRunning}
            breakRunning={info.breakRunning}
          >
            Reset
          </ResetButton>
        </div>
      </main>
      <audio
        src={beep}
        ref={audioRef}
      ></audio>
    </div>
  );
}

export default App;
