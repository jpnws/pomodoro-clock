import PropTypes from "prop-types";

import styles from "./TimerBox.module.css";

export default function TimerBox({ timerLabel, minutes, seconds }) {
  return (
    <div className={styles.timerBox}>
      <div className={styles.timerLabel}>{timerLabel}</div>
      <div className={styles.timeLeft}>{`${minutes}:${seconds}`}</div>
    </div>
  );
}

TimerBox.propTypes = {
  timerLabel: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
};
