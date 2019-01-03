import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch} from 'react-router-dom'
import history from './config/history';
import './index.css';
import 'antd/dist/antd.css';
import './assets/css/style.css';
import * as serviceWorker from './serviceWorker';
/* 组件  引入自己写的组件(class)*/
import SiderDemo from './App';
import HomePage from './assembly/home';
import AgentList from './assembly/agentList';
import addAgent from './assembly/addAgent';

import Login from './login';

const Web = () => {
    return(
        <Router history={history}>
          <Switch>
          <Route  exact path='/' component={Login}/>
            <SiderDemo path='/main' component={HomePage}>
                <Route  path='/main/agentList' component={AgentList}/>
                <Route  path='/main/addAgent' component={addAgent} />
            </SiderDemo>
          </Switch>
        </Router>
    )
}

ReactDOM.render(<Web />, document.getElementById('root'));

//registerServiceWorker就是为react项目注册了一个service worker，
// 用来做资源的缓存，这样你下次访问时，就可以更快的获取资
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
