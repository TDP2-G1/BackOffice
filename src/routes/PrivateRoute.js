import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {app} from "../app/app";

export const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest}
        //TODO: meter logica de login aca
               render={props => <Component {...props}/>}
        />
    );
};