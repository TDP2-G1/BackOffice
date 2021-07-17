import React, {Component} from 'react';
import "../assets/css/Home.css";
import Paperbase from "../components/Paperbase"
import UserList from "../components/UserList"
import MessageService from "../services/messages";

export class Users extends Component {
    render() {
        MessageService.getAll()
        return (
            <Paperbase selectedRoute='home' header='Listado de usuarios' ><UserList></UserList></Paperbase>
        )
    }
}
