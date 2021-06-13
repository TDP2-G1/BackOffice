import React from 'react';

export default class HealthTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            status: ''
        }       
        this.getStatus.bind(this);
    }

    async componentDidMount() {
        this.getStatus();
        setInterval(this.getStatus, 15000);                
    }

    getStatus = () =>{
        fetch(this.props.healthTestUrl)
        .then(response => response.json())
        .then(data => this.setState({ status: data.status, loading: false }));  
    }

    componentDidUpdate(prevProps, prevState) {
          
    }        

    render() {        
        return <div>
                {this.state.loading && <p>Checking server status for {this.props.serverName}</p>}
                {!this.state.loading && <p>{this.props.serverName} status: {this.state.status}</p>}
                </div>
    }

    
}

