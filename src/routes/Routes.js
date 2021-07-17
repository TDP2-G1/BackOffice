import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {app} from "../app/app";
import {Users} from "../controllers/Users";
import {Login} from "../controllers/Login";
import {DashboardController} from "../controllers/DashboardController";
import {PrivateRoute} from "./PrivateRoute";

class Routes extends Component {
    render() {
        return (
            <Router key="router">
                {/* TODO: Login aca tambien */}
                <Route exact={localStorage.getItem("token") ? true : false} path={localStorage.getItem("token") ? app.routes().login : '/'} render={props => localStorage.getItem("token") ?
                    <Redirect to={{pathname: app.routes().dashboard}}/> :
                    <Login {...props}/>
                }/>
                <PrivateRoute exact path={app.routes().dashboard} component={DashboardController}/>
                <PrivateRoute exact path={app.routes().userlist} component={Users}/>
            </Router>
        )
    }


}

export default Routes;