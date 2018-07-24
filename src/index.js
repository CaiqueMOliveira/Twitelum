import React from 'react';
import ReactDOM from 'react-dom';

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/notificacao.css'

import './assets/css/novoTweet.css'
// import './index.css';


import Home from './pages/Home';
import Login from './pages/Login';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route component={() => <div>Not Found 404</div>}/>
        </Switch>
    </BrowserRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
