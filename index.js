class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="wrapper"></div>;
  }
}

ReactDOM.render(<App />, document.getElementById("pomodoro"));
