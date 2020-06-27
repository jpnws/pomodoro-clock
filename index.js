class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.countDownSession = this.countDownSession.bind(this);
  }

  handleReset(event) {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      sessionTimeLeft: 0,
      sessionRunning: false,
    });
  }

  handleBreakIncrement(event) {
    if (this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1,
      });
    }
  }

  handleBreakDecrement(event) {
    if (this.state.breakLength > 0) {
      this.setState({
        breakLength: this.state.breakLength - 1,
      });
    }
  }

  handleSessionIncrement(event) {
    if (this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
      });
    }
  }

  handleSessionDecrement(event) {
    if (this.state.sessionLength > 0) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
      });
    }
  }

  handleStartStop(event) {
    if (!this.state.sessionRunning) {
      this.setState({
        sessionTimeLeft: this.state.sessionLength * 60,
        sessionCountDown: setInterval(this.countDownSession, 1000),
        sessionRunning: true,
      });
    } else {
      clearInterval(this.state.sessionCountDown);
      this.setState({
        sessionTimeLeft: 0,
        sessionRunning: false,
      });
    }
  }

  countDownSession() {
    if (this.state.sessionTimeLeft > 0) {
      this.setState({
        sessionTimeLeft: this.state.sessionTimeLeft - 1,
      });
    }
  }

  render() {
    return (
      <div className="subroot-wrapper">
        <div id="timer-label">Session</div>
        <div id="time-left">{this.state.sessiontimeLeft}s</div>
        <div id="break-label">Break Length</div>
        <div id="break-length">{this.state.breakLength}</div>
        <div id="session-label">Session Length</div>
        <div id="session-length">{this.state.sessionLength}</div>
        <button
          id="start_stop"
          className="start-stop-btn"
          onclick={this.handleStartStop}
        >
          Start/Stop
        </button>
        <button id="reset" className="reset-btn" onClick={this.handleReset}>
          Reset
        </button>
        <button
          id="break-increment"
          className="break-increment-btn"
          onClick={this.handleBreakIncrement}
        >
          Break Increment
        </button>
        <button
          id="break-decrement"
          className="break-decrement-btn"
          onClick={this.handleBreakDecrement}
        >
          Break Decrement
        </button>

        <button
          id="session-increment"
          className="session-increment-btn"
          onClick={this.handleSessionIncrement}
        >
          Session Increment
        </button>
        <button
          id="session-decrement"
          className="session-decrement-btn"
          onClick={this.handleSessionDecrement}
        >
          Session Decrement
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("pomodoro-clock"));
