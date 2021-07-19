import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Chart from "react-google-charts";
import MomentUtils from '@date-io/moment';
import MessageDataService from '../services/messages-service';
import { get } from "../communication/Request";

const styles = (theme) => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});



class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            date: new Date(),
            denuncias: [],
            sessions: [],
            chartData: [],
            reportsData: [],
            messages: []
        };
        this.selectDate = this.selectDate.bind(this)
        this.finishedLoadingCallback = this.finishedLoadingCallback.bind(this)
    }

    finishedLoadingCallback = (messages) => {
        let messageData = messages ? Object.entries(messages).map(m => ({ day: m[0].split('_')[0], month: m[0].split('_')[1], year: m[0].split('_')[2], messageCount: m[1] })) : []
        this.setState({ messages: messageData })
        this.setChartData(this.state.date.getMonth(), this.state.date.getFullYear())
        this.setState({ loading: false })
        console.log('messages')
        console.log(JSON.stringify(messages))
    }

    async componentDidMount() {
        await this.getDenuncias()
        await this.getSessions()
        MessageDataService.getAll(this.finishedLoadingCallback)

    }

    async getDenuncias() {
        const token = '';
        const endpoint = 'https://tdp2-tp1-users-service.herokuapp.com/report/dataset';
        const response = await get(endpoint, token);
        if (response.status == 200) {
            let json = await response.json();
            this.setState({ denuncias: json });
        }
    }

    async getSessions() {
        const token = '';
        const endpoint = 'https://tdp2-tp1-users-service.herokuapp.com/login/dataset';
        const response = await get(endpoint, token);
        if (response.status == 200) {
            let json = await response.json();
            this.setState({ sessions: json });
        }
    }

    selectDate(date) {
        this.setState({ date: date._d })
        this.setChartData(date._d.getMonth(), date._d.getFullYear())
    }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    };

    setChartData = (month, year) => {
        let days = this.daysInMonth(month + 1, year)
        let newChartData = []
        let sessionsForRange = this.state.sessions.filter(f => f.month === month + 1 && f.year === year)
        let messageDataForRange = this.state.messages.filter(f => f.month == month + 1 && f.year == year)
        let currentDate = new Date()
        for (let index = 1; index <= days; index++) {
            let sessionDayData = sessionsForRange.find(s => s.day === index)
            let messageDayData = messageDataForRange.find(s => s.day == index)
            newChartData.push([index.toString(), sessionDayData ? sessionDayData.active_users : new Date(year, month, index) > currentDate ? null : 0, messageDayData ? messageDayData.messageCount : new Date(year, month, index) > currentDate ? null : 0])
        }

        newChartData = [[
            'Día',
            'Usuarios únicos',
            'Cantidad de mensajes',
        ], ...newChartData]

        this.setState({ chartData: newChartData })
    }

    render() {

        return (
            <div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        label="Mes y Año"
                        helperText="Seleccione mes y año"
                        value={this.state.date}
                        onChange={(newValue) => this.selectDate(newValue)}
                        disableFuture={true}
                    />
                </MuiPickersUtilsProvider>
                {!this.state.loading &&
                    <div style={{ height: '100%', display: 'flex' }}>
                        <Chart
                            width={'100%'}
                            height={'650px'}
                            chartType="Line"
                            loader={<div>Loading Chart</div>}
                            data={this.state.chartData}
                            options={{
                                chart: {
                                    title: 'Actividad diaria',
                                },
                                legend: { position: 'none' },
                                series: {
                                    // Gives each series an axis name that matches the Y-axis below.
                                    0: { axis: 'Sesiones' },
                                    1: { axis: 'Mensajes' },
                                },
                                axes: {                                    
                                    // Adds labels to each axis; they don't have to match the axis names.                                
                                    y: {
                                        Sesiones: { label: 'Sesiones' },
                                        Mensajes: { label: 'Mensajes' },
                                    },
                                },
                            }}
                            rootProps={{ 'data-testid': '3' }}
                        />
                        <Divider orientation="vertical" style={{marginRight: '5px', marginLeft: '5px'}}></Divider>
                        <div style={{ width: '15%', backgroundColor: 'white', display: 'flex', flexDirection:'column', justifyContent: 'space-around', alignItems:'center' }}>
                            <Typography variant='h4' style={{textAlign:'center'}}>
                                Denuncias del mes
                            </Typography>
                            <Typography variant='h5'>
                                Pendientes:
                            </Typography>
                            <Typography variant='h1'>
                            {this.state.denuncias.find(d => d.month == this.state.date.getMonth() + 1 && d.year == this.state.date.getFullYear()) ? this.state.denuncias.find(d => d.month == this.state.date.getMonth() + 1 && d.year == this.state.date.getFullYear()).pendientes : 0}
                            </Typography>
                            <Typography variant='h5'>
                                Abiertas: 
                            </Typography>
                            <Typography variant='h1'>
                                {this.state.denuncias.find(d => d.month == this.state.date.getMonth() + 1 && d.year == this.state.date.getFullYear()) ? this.state.denuncias.find(d => d.month == this.state.date.getMonth() + 1 && d.year == this.state.date.getFullYear()).abiertas : 0}
                            </Typography>
                        </div>
                    </div>

                }

            </div>

        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);