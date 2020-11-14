# react基础笔记

### react基础学习记录

```javascript
// 根组件的组件定义
//cnpm install react-router-dom --save 安装react路由
//cnpm install redux --save 安装react数据仓库
//cnpm install react-redux --save 安装react数据仓库
// 可以使用ant ui组件库
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// 这里获取App即根组件
import * as serviceWorker from './serviceWorker'

// import {HashRouter as Router,Link,Route} from 'react-router-dom'
//以哈希模式导入路由
import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom'
//以history模式导入路由

import { createStore } from 'redux'
// 安装Redux后调用
import { Provider, connect } from 'react-redux'

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
下面是函数式组件基础
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

// let app = <App />
// // jsx存储组件
// let time = new Date().toDateString()
// let h1 = <h1>{time}</h1>
// // 一个组件最外层的标签只能有一个
// let root = document.getElementById('root')
// 直接写不建议使用

let root = document.getElementById('root')
let bgclass = 'bgRed'
// 在classname中调用则app.css中该变量对应的选择器为 .
let mystyle = {
  borderBottom: '12px solid blue',
  'font-size': '26px'
  /* jsx中定义style第一个单词照常第二个单词首字母大写
  或者该属性用引号引起来*/
  // 不建议使用引号的形式，控制台会警告
}
function Clock(props) {
  // 注意函数式开发函数首字母要大写
  return (
    <h1 className={bgclass} style={mystyle}>
      {props.date.toLocaleTimeString()}
      <div>//注释测试</div>
      {/* jsx中只能这样写注释，
      上面的</div>即使灰了也并没有被注释 */}
    </h1>
    // 其中style中定义样式只能事对象的形式，即{变量}或{{样式}}
  )
}
// ReactDOM.render(<Clock date={new Date()} />, root)
// props用于传值，单向流动只能从父到子
// 函数式组件开发，静态组件

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
下面是类式组件基础
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

class Jsclass extends React.Component {
  constructor(props) {
    super(props)
  }
  // 同样类组件名首字母也要大写
  render() {
    return (
      <div>
        <p>{this.props.num}</p>
        <button onClick={this.props.myclick}>父传子</button>
        <button onClick={() => { console.log(this.props.children); }}>控制台查看插槽</button>
        {this.props.children[0]}
        {/* 插槽通过children */}
        <Clock date={new Date()}></Clock>
      </div>
    )
  }
}
// 类组件开发，动态组件

function myvar(props) {
  // 路由调用的组件
  console.log(props);
  // 输出props，获取路由参数等
  return (<span>{props.location.state.msg}</span>)
  // 用变量渲染
}

function id(props) {
  // 路由调用的组件
  console.log(props);
  // 输出props，获取路由参数等
  return (<span>{props.match.params.path}</span>)
  // 用变量渲染
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
下面是redux的部分，下面将用函数组件实现，redux使用比较麻烦，不知道要不要就不用
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const reducer = function (state = { num: 0 }, action) {
  switch (action.type) {
    case "add":
      state.num++
      break
    case "sub":
      state.num--
      break
    default:
      break
  }
  return { ...state }
  // 结构赋值,最好要加
}
// 管理redux仓库的对应方法
const store = createStore(reducer)
// 创建仓库，用reducer处理action，结果放入store
function add() {
  store.dispatch({ type: 'add' })
  // 调用store中的dispatch传入action
}
function sub() {
  store.dispatch({ type: 'sub' })
}
function Counter(props) {
  let state = store.getState()
  // store.getState()为获取数据
  return (
    <div>
      <div>这是计数{state.num}</div>
      {/* state下放的redux数据 */}
      <button onClick={add}>加一</button>
      <button onClick={sub}>减一</button>
    </div>
  )
}
store.subscribe(() => {
  ReactDOM.render(<Plusclass />, root)
})
// store.subscribe()订阅仓库数据变化，使用回调重新渲染实现数据动态改变

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
下面是react-redux的部分,不需要订阅监听仓库数据变化,下面将用类组件实现，react-redux使用比较麻烦，不知道要不要就不用
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

class Counterclass extends React.Component {
  render() {
    const value = this.props.value
    // 通过state传给props，直接使用props就可以获取
    const onAddClick = this.props.onAddClick
    console.log(this.props);
    return (
      <div>
        <div>这是计数{value}</div>
        {/* state下放的redux数据 */}
        <button onClick={onAddClick}>加一</button>
      </div>
    )
  }
}
const addAction = {
  type: 'add'
}

function reducer2(state = { value: 0, other:'这是其他值'}, action) {
  // state可以传多个值，但是不要忘了在mapStateToProps中写映射
  switch (action.type) {
    case "add":
      state.value++
      console.log(state.value);
      break
    default:
      break
  }
  // 不限于使用Switch，也可以构建一个函数对action.type判断调用
  return { ...state }
}

const store2 = createStore(reducer2)

function mapStateToProps(state) {
  // 函数名自定义但是最好采用mapStateToProps代表state映射
  return {
    value: state.value,
    other:state.other
    // state中的值不要忘记绑定
  }
}
const mapDispatchToProps = (dispatch) => {
  // 函数名自定义但是最好采用mapDispatchToProps代表dispatch映射
  return {
    onAddClick: () => {
      dispatch(addAction)
    }
    // 这里是映射的方法
    // 方法要绑定才能使用
  }
}

const ReactRedux = connect(mapStateToProps, mapDispatchToProps)(Counterclass)
// connect为react-redux的关联方法，可以将组件外的方法映射的仓库中，形成新的组件

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
下面是总的组件，并结合了路由
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

class Plusclass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0,
      list: ['列表1', '列表2', '列表3']
    }
    // state管理，这里对类不熟悉还需要加强js学习

    // this.myclick = this.myclick.bind(this)
    // 事件绑定this，这里对this的理解还需要学习
  }

  // myclick() {
  //   this.setState({
  //     num:this.state.num+1
  //   })
  // }
  myclick = (e) => {
    this.setState({
      num: this.state.num + 1
    })
  }
  /* 两种方式，上面那种需要写绑定，
  箭头函数直接就可以用，但是箭头函数会造成额外渲染 */
  // 箭头函数的this就是外部的this，而匿名函数的this是匿名函数本身

  history = () => {
    console.log(this.props);
  }

  render() {
    if (false) {
      return '这是条件渲染的一种方式'
    }
    else {
      return (
        <Provider store={store2}>
          {/* 用react-redux封装的最外层组件Provider，传入store
            与redux不一样，不用订阅渲染
          */}
            <p onClick={this.myclick}>点我改变{this.state.num}</p>
            {/* 在react中原生事件被代理了，想要调用需要采用驼峰命名法，
          其值必须用变量的形式表示 */}
            {/* 函数传参不能直接用 函数(参数) ，
          要使用 (e)=>{函数(参数,e)} 这种回调函数的形式（e可有可无），
          否则会被当成字符串，只在加载时调用一次 */}
            {this.state.num == 1 || this.state.num == 2 ? <h4>此时为1或2</h4> : '这是条件渲染'}
            <Jsclass myclick={this.myclick} num={this.state.num}>
              <h4>插槽1</h4>
              <h3>插槽2</h3>
              {/* 这里是插槽，在组件的this.props.children获取 */}
            </Jsclass>
            {/* 子传父父传子原理都是父传子，子传父只是调用父为子传入的方法 */}

            {this.state.list.map((e, i) => {
              return <div id={i} key={i}>{e}</div>
            })}
            {/* 列表渲染用遍历的方法实现，相对vue复杂一些 */}
            <Router>
              {/* 可以写多个Router */}
              <Link to='/'>显示路由</Link>&nbsp;&nbsp;
            <Link to='/root' replace>显示路由root不可回退到上一个路由(狂点该路由只能回退一次)</Link>&nbsp;&nbsp;
            {/* replace 为替换，即替换上一个路由的histroy栈
            即不可回退到上一个路由 */}
              <Link to={{ pathname: "/myvar", search: '?username=admin', hash: "#abc", state: { msg: '我的消息' } }}>这里是变量</Link>&nbsp;&nbsp;
            {/* 这里采用变量的形式传递路由 */}
              {/* 控制台props含有的history */}
              <Link to='/id/456'>动态渲染路由参数</Link>&nbsp;&nbsp;
            {/* 控制台props含有的history */}
              {/* history里的方法可以进行路由的存储查找前进后退等 */}
              <Route path='/' exact>路由</Route>
              {/* exact 精确匹配 */}
              <Route path='/root'>路由root</Route>
              <Route path='/myvar' component={myvar}></Route>
              {/* 以component关联的组件渲染 */}path:
            <Route path='/id/:path' component={id}></Route>
              {/* 动态渲染路由参数 */}
            </Router>
            <br />
            <Router basename='/jionMe'>
              {/* basename为基础路径会在加载的路由前面加上该路径 */}
              <Link to='/'>显示路由(两个Route本应该加载两次)</Link>&nbsp;&nbsp;
            <Link to='/root'>显示路由root</Link>&nbsp;&nbsp;
            <Link to='/home'>虽然是home但是重定向到root</Link>&nbsp;&nbsp;
            <Switch>
                {/* Switch使只有第一个Route加载 */}
                <Route path='/' exact>第一个路由</Route>&nbsp;
              <Route path='/' exact>第二个路由</Route>&nbsp;
            {/* 在 / 路由的属性中加入 exact 可以使其Route值可以被替换，
            exact 意为精确匹配 */}
              </Switch>
              <Route path='/root'>路由root</Route>
              <Route path='/home'>虽然是home但是重定向到root
            <Redirect to='/root'></Redirect>
                {/* 重定向一般配合条件跳转，使用场景不多 */}
              </Route>
            </Router>
            <br />
            <Counter></Counter>
            <br />
            <ReactRedux></ReactRedux>
            <App></App>
            {/* 调用App这个组件 */}
        </Provider>
      )
    }
  }
}


ReactDOM.render(<Plusclass />, root)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// export default demoCom
// 导出名为demoCom的组件，用在子组件中服务于父组件的调用

```



### 生命周期

组件的生命周期可分成三个状态：

- Mounting：已插入真实 DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实 DOM

生命周期的方法有：

- **componentWillMount** 在渲染前调用,在客户端也在服务端。
- **componentDidMount** : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
- **componentWillReceiveProps** 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
- **shouldComponentUpdate** 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
   可以在你确认不需要更新组件时使用。
- **componentWillUpdate**在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
- **componentDidUpdate** 在组件完成更新后立即调用。在初始化时不会被调用。
- **componentWillUnmount**在组件从 DOM 中移除之前立刻被调用。