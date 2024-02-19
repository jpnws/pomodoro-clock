import PropTypes from "prop-types";

import styles from "./BreakLengthBox.module.css";

export default function BreakLengthBox({
  breakLength,
  handleBreakIncrement,
  handleBreakDecrement,
}) {
  return (
    <div className={styles.breakLengthBox}>
      <div className={styles.breakLabel}>Break Length</div>
      <div className={styles.breakLength}>{breakLength} minutes</div>
      <button
        className={styles.breakIncrementButton}
        onClick={handleBreakIncrement}
      >
        ⮝
      </button>
      <button
        className={styles.breakDecrementButton}
        onClick={handleBreakDecrement}
      >
        ⮟
      </button>
    </div>
  );
}

BreakLengthBox.propTypes = {
  breakLength: PropTypes.number,
  handleBreakIncrement: PropTypes.func,
  handleBreakDecrement: PropTypes.func,
};
