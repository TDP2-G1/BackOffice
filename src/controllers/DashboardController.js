import React, {Component} from 'react';
import Paperbase from "../components/Paperbase"
import Dashboard from "../components/Dashboard"

export class DashboardController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                email: '',
                password: '',
            },
        };
    }

    render() {
        return (
            <Paperbase selectedRoute='dashboard' header='Dashboard' ><Dashboard></Dashboard></Paperbase>
        )
    }
}



