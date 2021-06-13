import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {app} from "../app/app";
import {Users} from "../controllers/Users";
import {PrivateRoute} from "./PrivateRoute";

class Routes extends Component {
    render() {
        return (
            <Router key="router">
                {/* TODO: Login aca tambien */}
                {/* <Route exact path={app.routes().login} render={props => localStorage.getItem("token") ?
                    <Redirect to={{pathname: app.routes().home}}/> :
                    <Login {...props}/>
                }/>     */}            
                <PrivateRoute exact path={app.routes().userlist} component={Users}/>
            </Router>
        )
    }


}

export default Routes;