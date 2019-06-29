import React,{ Fragment,Component } from 'react';
import Clock from './Clock'
import Game from './Game'


function ConditionShowJsx(props){
  console.log('ConditionShowJsx:' + props.show)
  if(!props.show){
    return null;
  }

  return (
    <p>你可以让 render 方法直接返回 null，而不进行任何渲染</p>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      show : true,
      unshow : false,
      condition : true,
      conditionShow : true,
    };
    this.handleToggleClick = this.handleToggleClick.bind(this); //暴露出去并且在模板中运行时，handleToggleClick中的this已经不是指向App class了，需要试用bind继承App class的所有方法和属性
  }

  componentDidMount = function(){
    this.setState((state,props) => {
        return  {
          list : [1,2,3]
        }
    })
  }

  handleToggleClick = function() {
    this.setState({
      conditionShow : !this.state.conditionShow
    });
    console.log(this.state.conditionShow)
  }

  

  methods = {
    preventDefault(e){
      console.log(e,e.target)
      e.preventDefault();
    }
  }

  render() {
    return (
      <Fragment>
      <div><input type="text" ></input><button>提交</button></div>
      <a href="www.kugou.com" onClick={this.methods.preventDefault}>跳转百度</a>
      {/* <a href="#" onCopy={e => {console.log(1111)}}>copy</a> */}
      <h3>
        运算符&&
      </h3>
      {this.state.show && 
      <Fragment>
        <p>true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。
        </p>
        <p>
          因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
        </p>
      </Fragment>
      }
      <h3>
        三目运算符
      </h3>
      {this.state.condition ? 
        <p>'condition ? true : false'</p>
        :
        <p>none</p>
      }
      <h3>
      阻止组件渲染
      </h3>
      <div style={{height:70 + 'px'}}>
        <button onClick={this.handleToggleClick}>change conditionShow </button>
        <ConditionShowJsx show={this.state.conditionShow}/>
      </div>
      <hr></hr>
      <ul>
        <li></li>
        <li>{ 2 + 2}</li>
        <li>{ new Date().getTime() }</li>
        <li>{ this.state.list[2] }</li>
      </ul>
      <Clock />
      <Game />
      </Fragment>
    );
  }
}

export default App;
