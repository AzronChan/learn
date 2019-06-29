import React,{ Component  } from 'react';

class Clock extends Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount(){
    console.log('componentDidMount');

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
    clearInterval(this.timerID);
  }
  //自定义方法
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    //每次更新都会掉render
    // console.log('render');

    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;
