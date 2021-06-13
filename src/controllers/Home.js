import React, {Component} from 'react';
import logo from '../assets/img/logo.svg';
import "../assets/css/Home.css";
import Paperbase from "../components/Paperbase"
import Register from "../components/Register"

export class Home extends Component {
    render() {
        return (           
            <Paperbase selectedRoute='home' header='User Management' ><Register></Register></Paperbase>
        )
    }
}
