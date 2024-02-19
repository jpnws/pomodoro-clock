import PropTypes from "prop-types";

import styles from "./StopButton.module.css";

export default function StopButton({
  sessionRunning,
  breakRunning,
  handleStartStop,
}) {
  return (
    <button
      className={`${styles.stopButton} ${
        !sessionRunning && !breakRunning
          ? styles.disabledCursor
          : styles.enabledCursor
      }`}
      onClick={handleStartStop}
      disabled={!sessionRunning && !breakRunning}
    >
      Stop
    </button>
  );
}

StopButton.propTypes = {
  sessionRunning: PropTypes.bool,
  breakRunning: PropTypes.bool,
  handleStartStop: PropTypes.func,
};
