import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

class PrivateRoute extends Component
{
    render(){
        const NOSSO_COMPONENT = this.props.component;
        if(localStorage.getItem('token'))
        {
            return <Route component={NOSSO_COMPONENT}/>
        }
        return <Redirect to='/login'/>
    }
}

export default PrivateRoute