import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';

class Routes extends Component 
{
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route component={() => <div>Not Found 404</div>}/>
            </Switch>
        )
    }
}

export default Routes