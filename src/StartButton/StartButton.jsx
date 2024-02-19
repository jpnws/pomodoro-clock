import PropTypes from "prop-types";

import styles from "./StartButton.module.css";

export default function StartButton({
  sessionRunning,
  breakRunning,
  handleStartStop,
}) {
  return (
    <button
      className={`${styles.startButton} ${
        !sessionRunning && !breakRunning
          ? styles.enabledCursor
          : styles.disabledCursor
      }`}
      onClick={handleStartStop}
      disabled={sessionRunning || breakRunning}
    >
      Start
    </button>
  );
}

StartButton.propTypes = {
  sessionRunning: PropTypes.bool,
  breakRunning: PropTypes.bool,
  handleStartStop: PropTypes.func,
};
