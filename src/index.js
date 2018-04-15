import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import App from './layout/App';
import Home from './scenes/home';
import Course from './scenes/course';
import Chapter from './scenes/chapter';
import Login from './scenes/login/index';
import Register from './scenes/register';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { Router, Route, Link,IndexRoute, browserHistory, hashHistory } from "react-router";

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={App}>
          <IndexRoute component={Home}></IndexRoute>
          <Route path="/course/:cid" component={Course}></Route>
          <Route path="/chapter/:cid/:ch_id" component={Chapter}></Route>
        </Route>
      </Router>
    </Provider>
  </LocaleProvider>
  ,
document.getElementById('root'));

registerServiceWorker();
