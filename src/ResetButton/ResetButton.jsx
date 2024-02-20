import PropTypes from "prop-types";

import styles from "./ResetButton.module.css";

export default function ResetButton({
  handleReset,
  sessionRunning,
  breakRunning,
}) {
  return (
    <button
      className={`${styles.resetButton} ${
        (sessionRunning || breakRunning) && styles.disabledButton
      }`}
      onClick={handleReset}
      disabled={sessionRunning || breakRunning}
    >
      Reset
    </button>
  );
}

ResetButton.propTypes = {
  handleReset: PropTypes.func,
  sessionRunning: PropTypes.bool,
  breakRunning: PropTypes.bool,
};
