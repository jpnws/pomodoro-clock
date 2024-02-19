import PropTypes from "prop-types";

import styles from "./ResetButton.module.css";

export default function ResetButton({ handleReset }) {
  return (
    <button
      className={styles.resetButton}
      onClick={handleReset}
    >
      Reset
    </button>
  );
}

ResetButton.propTypes = {
  handleReset: PropTypes.func,
};
