import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter, Route,  Switch, Link  } from 'react-router-dom'
import Userinfo from './container/userinfo/userinfo'
import Home from './container/home/home'
import User from './container/user/user'
import Post from './container/post/post'
import Add from './container/add/add'
import Welcome from './container/Welcome/welcome'
import ChangeInfo from './container/changeinfo/changeinfo'
//拦截
import './config.js'
const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f
//通过中间件实现请求
const store= createStore(reducer,compose(
    applyMiddleware(thunk),
    reduxDevtools
))

ReactDOM.render(
(
    <Provider store = { store }>
        <BrowserRouter>
            <div>
            <Switch>
                <Route exact path = '/welcome' component = {Welcome}></Route> 
                {/* 生活圈首页(默认跳转) */}
                <Route exact path = '/' component = {Welcome}></Route> 
                {/* 生活圈首页(默认跳转) */}
                <Route path = '/userinfo' component = {Userinfo}></Route> 
                {/* 用户注册信息页面 */}
                <Route path = '/home' component = {Home}></Route> 
                {/* 生活圈首页 */}
                <Route path = '/post' component = {Post}></Route> 
                {/* 动态详情界面 */}
                <Route path = '/user' component = {User}></Route> 
                {/* 用户个人界面 */}
                <Route path = '/createpost' component = {Add}></Route> 
                {/* 用户发帖界面 */}
                <Route path = '/changeinfo' component = {ChangeInfo}></Route> 
                {/* 用户修改信息 */}
            </Switch> 
            </div>
        </BrowserRouter>
    </Provider>
),



document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
