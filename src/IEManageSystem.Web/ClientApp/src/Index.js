import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import ManageHome from './ManageHome/index'
import Home from './Home/Index.jsx'
import Account from './Account/account.jsx'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import {getIEStore} from 'Core/IEStore'

import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';
import 'commoncss';
import 'cookie';
import 'ielib';
import 'ToolLibrary/IETool.js';
import 'css/simple-btn.css'

let moduleFactory = new ModuleFactory();
moduleFactory.init();

let store = getIEStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/ManageHome" component={ManageHome} />
                <Route path="/Account" component={Account} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('Home'));

// 设置根字体大小
let width = document.body.clientWidth
let fontsize = parseInt(width / 124);
document.documentElement.style.fontSize = fontsize + "px";
document.body.style.fontSize = fontsize + "px";

// 窗口改变是重新设置根字体大小
(function () {
    window.onresize = function () {
        let width = document.body.clientWidth
        let fontsize = parseInt(width / 124);
        document.documentElement.style.fontSize = fontsize + "px";
        document.body.style.fontSize = fontsize + "px";
    };
})();