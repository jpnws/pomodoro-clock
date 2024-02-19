import PropTypes from "prop-types";

import styles from "./SessionLengthBox.module.css";

export default function SessionLengthBox({
  sessionLength,
  handleSessionIncrement,
  handleSessionDecrement,
}) {
  return (
    <div className={styles.sessionLengthBox}>
      <div className={styles.sessionLabel}>Session Length</div>
      <div className={styles.sessionLength}>{sessionLength} minutes</div>
      <button
        className={styles.sessionIncrementButton}
        onClick={handleSessionIncrement}
      >
        ⮝
      </button>
      <button
        className={styles.sessionDecrementButton}
        onClick={handleSessionDecrement}
      >
        ⮟
      </button>
    </div>
  );
}

SessionLengthBox.propTypes = {
  sessionLength: PropTypes.number,
  handleSessionIncrement: PropTypes.func,
  handleSessionDecrement: PropTypes.func,
};
