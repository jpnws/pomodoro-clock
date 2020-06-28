class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleReset = this.handleReset.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.countDownSession = this.countDownSession.bind(this);
    this.countDownBreak = this.countDownBreak.bind(this);
  }

  handleReset(event) {
    document.getElementById("beep").load();
    clearInterval(this.sessionInterval);
    clearInterval(this.breakInterval);
    this.setState({
      breakLength: 5,
      breakTimeLeft: 0,
      breakRunning: false,
      breakInit: true,
      sessionLength: 25,
      sessionTimeLeft: 1500,
      sessionRunning: false,
      sessionInit: true,
      timerLabel: "Session",
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
    if (this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1,
      });
    }
  }

  handleSessionIncrement(event) {
    if (this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        sessionTimeLeft: (this.state.sessionLength + 1) * 60,
      });
    }
  }

  handleSessionDecrement(event) {
    if (this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        sessionTimeLeft: (this.state.sessionLength - 1) * 60,
      });
    }
  }

  handleStartStop(event) {
    if (this.state.sessionInit) {
      this.setState({
        sessionTimeLeft: this.state.sessionLength * 60,
        sessionInit: false,
        sessionRunning: true,
        timerLabel: "Session",
      });
      this.sessionInterval = setInterval(() => this.countDownSession(), 1000);
    } else if (!this.state.sessionRunning) {
      this.setState({
        sessionRunning: true,
      });
      this.sessionInterval = setInterval(() => this.countDownSession(), 1000);
    } else {
      clearInterval(this.sessionInterval);
      this.setState({
        sessionRunning: false,
      });
    }
  }

  countDownSession() {
    if (this.state.sessionTimeLeft > 0) {
      this.setState({
        sessionTimeLeft: this.state.sessionTimeLeft - 1,
      });
    } else if (this.state.sessionTimeLeft === 0) {
      document.getElementById("beep").play();
      clearInterval(this.sessionInterval);
      this.setState({
        sessionRunning: false,
        sessionInit: true,
        breakTimeLeft: this.state.breakLength * 60,
        breakInit: false,
        breakRunning: true,
        timerLabel: "Break",
      });
      this.breakInterval = setInterval(() => this.countDownBreak(), 1000);
    }
  }

  countDownBreak() {
    if (this.state.breakTimeLeft > 0) {
      this.setState({
        breakTimeLeft: this.state.breakTimeLeft - 1,
      });
    } else if (this.state.breakTimeLeft === 0) {
      document.getElementById("beep").play();
      clearInterval(this.breakInterval);
      this.setState({
        breakRunning: false,
        breakInit: true,
        sessionTimeLeft: this.state.sessionLength * 60,
        sessionInit: false,
        sessionRunning: true,
        timerLabel: "Session",
      });
      this.sessionInterval = setInterval(() => this.countDownSession(), 1000);
    }
  }

  pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  render() {
    let minutes = 0;
    let seconds = 0;
    minutes = Math.trunc(this.state.sessionTimeLeft / 60);
    seconds = this.state.sessionTimeLeft - minutes * 60;
    if (this.state.breakRunning) {
      minutes = Math.trunc(this.state.breakTimeLeft / 60);
      seconds = this.state.breakTimeLeft - minutes * 60;
    }
    minutes = this.pad(minutes, 2);
    seconds = this.pad(seconds, 2);
    let play_stop_btn = "▶";
    if (this.state.sessionRunning || this.state.breakRunning) {
      play_stop_btn = "⏸";
    }
    return (
      <div className="subroot-wrapper">
        <div class="clock-title">Pomodoro Clock</div>
        <div class="timer-box">
          <div id="timer-label">{this.state.timerLabel}</div>
          <div id="time-left">{`${minutes}:${seconds}`}</div>
        </div>
        <div class="length-box">
          <div class="session-length-box">
            <div id="session-label">Session Length</div>
            <div id="session-length">{this.state.sessionLength}</div>
            <button
              id="session-increment"
              className="session-increment-btn"
              onClick={this.handleSessionIncrement}
            >
              ⮝
            </button>
            <button
              id="session-decrement"
              className="session-decrement-btn"
              onClick={this.handleSessionDecrement}
            >
              ⮟
            </button>
          </div>
          <div class="break-length-box">
            <div id="break-label">Break Length</div>
            <div id="break-length">{this.state.breakLength}</div>
            <button
              id="break-increment"
              className="break-increment-btn"
              onClick={this.handleBreakIncrement}
            >
              ⮝
            </button>
            <button
              id="break-decrement"
              className="break-decrement-btn"
              onClick={this.handleBreakDecrement}
            >
              ⮟
            </button>
          </div>
        </div>
        <div class="control-box">
          <button
            id="start_stop"
            className="start-stop-btn"
            onClick={this.handleStartStop}
          >
            {play_stop_btn}
          </button>
          <button id="reset" className="reset-btn" onClick={this.handleReset}>
            ↺
          </button>
        </div>
        <audio className="beep-audio" id="beep" src="beep.mp3"></audio>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("pomodoro-clock"));
